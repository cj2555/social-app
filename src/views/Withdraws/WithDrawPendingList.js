import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'
import { useHistory, Link } from "react-router-dom";
//make style
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { IconButton, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Table from 'components/Table/Table.js';
import MUIDataTable from 'mui-datatables'
import axios from 'axios'
import MyVerticallyCenteredModal from 'components/Modal/MyVerticallyCenteredModal'
import Button from '@material-ui/core/Button';
// import Addcategory from './Addcategory'
import Api from 'util/Api';
import Storage from 'util/Storage'
import getImageBaseUrl from 'util/BaseUrl'
import EditIcon from '@material-ui/icons/Edit';
// import UpdateCategory from './UpdateCategory'
import { Badge, Dropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
// import Addservice from './Addservice'


//use style make custom style
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    table: {
        //change rwo height

    },
}));

//fetch category 

//delete category

const options = {
    //no view colmun

       filterType: 'checkbox',
        print: false,
        download: false,
        selectableRows: 'none',



};
const WithDrawPendingList = () => {
    const history = useHistory();
    const classes = useStyles()
    const [modalShow, setModalShow] = React.useState(false);
    const [rows, setRow] = React.useState()
    const [updateRowID, setupdateRowID] = React.useState(false)

    const ActionDropdown = ({ block_status, id }) => {

        const goToWithdrawDetails = (wid) => {
            history.push(`/admin/withdrawPay/${wid}`)
        }
        return (
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Action
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => {
                            goToWithdrawDetails(id)
                        }}
                    >
                        View
                    </Dropdown.Item>

                    <Dropdown.Item
                        style={{ display: block_status ? 'none' : null }}
                        onClick={() => handleBlock(id)}
                    >
                        block
                        {/* unblock user {block_status} */}
                    </Dropdown.Item>
                    <Dropdown.Item
                        style={{ display: block_status ? null : 'none' }}
                        onClick={() => handleBlock(id)}
                    >
                        unblock user
                    </Dropdown.Item>
                </Dropdown.Menu >



            </Dropdown >
        );
    }
    const FetchCategory = async () => {
        try {
            const res = await Api.get('/pendingWithdrawList',
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            
            )
          


            if (res.data.success) {
                setRow(res.data.data)
            }
        }
        catch (err) {
            alert(err.message)

        }
    }
    const DeleteCategory = async (id) => {
        try {
            await Api.get(`/ deleteCategory / ${id} `, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + Storage.getToken()
                }
            })
            FetchCategory()
        } catch (err) {
            alert(err.message)
        }


    }

    const handleBlock = async (id) => {
        try {
            const response = await Api.get(`/ service / handleBlock / ${id} `,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                });
            FetchCategory();
        } catch (err) {
            alert(err.message);
        }


    }

    const columns = [
        {
            name: "id",
            label: "ID",
        },
        
        {
            name: "amount",
            label: "Amount",
        },
        {
            name: "user",
            label: "user",
            options: {
                customBodyRender: (user, value) => {
                    return (
                        // <img src={`${ getImageBaseUrl() } / ${ value }`} style={{ width: '50px' }} / >
                        <div>
                            {user && (
                                <Link to={`/admin/userDetails/${user.id}`}> {user.name}</Link>
                            )}


                        </div>

                    )
                }
            }
        },
        {
            name: "created_at",
            label: "request date",

        },

        {
            name: "id",
            label: "Action",
            options: {
                filter: false,
                customBodyRender: (data, tableMeta) => {
                    return (
                        <ActionDropdown
                            id={tableMeta.rowData[0]}
                            block_status={tableMeta.rowData[7]}

                        />




                    )
                }
            }
        }


    ]
    //USE EFFECT HOOK
    React.useEffect(() => {

        FetchCategory()

    }, [])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}
                    // margin left
                    style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <Card>
                        <CardHeader
                            style={{
                                backgroundColor:
                                    //green color
                                    '#00C851',
                            }}
                        >

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 className={classes.cardTitleWhite}>Withdraw Pending</h4>

                            </div>
                        </CardHeader>
                        {/* <CardBody> */}
                        <MUIDataTable
                            className={classes.table}
                            data={rows}
                            columns={columns}
                            options={options}
                        />
                        {/* </CardBody> */}

                    </Card>



                    <GridItem xs={12} sm={12} md={6} >
                        {/* Number of category: {rows && rows.length} */}


                        {/* <Addservice
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onAdded={() => FetchCategory()}
                        /> */}

                    </GridItem>
                </GridItem>
            </GridContainer>

        </div >
    )


}



export default WithDrawPendingList
