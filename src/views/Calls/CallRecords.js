import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'
import { useHistory } from "react-router-dom";
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
import { Link } from "react-router-dom";
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

    filter: false,
    print: false,
    download: false,
    selectableRows: 'none',
    responsive: 'scroll',
    viewColumns: false,
    footer: false,
    pagination: false,
    //standerd vertical scrolling enable
    //change row height
    rowHover: true,



};
const CallRecords = () => {
    const history = useHistory();
    const classes = useStyles()
    const [modalShow, setModalShow] = React.useState(false);
    const [rows, setRow] = React.useState()
    const [updateRowID, setupdateRowID] = React.useState(false)

    const ActionDropdown = ({ block_status, id }) => {

        const goToserviceDetails = () => {
            history.push(`/admin/serviceById/${id}`)
        }
        return (
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Action
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {/* <Link to={`/ admin / serviceById / ${ id } `}> */}
                    <Dropdown.Item
                        onClick={() => {
                            goToserviceDetails(id)
                        }}
                    >
                        View
                    </Dropdown.Item>
                    {/* // </Link> */}

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
            const res = await Api.get('/callRecords',
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
    

    

    const columns = [
           {
            name: "service_giver",
            label: "Service Provider",
            options: {
                customBodyRender: (service_giver, value) => {
                    return (
                        // <img src={`${ getImageBaseUrl() } / ${ value }`} style={{ width: '50px' }} / >
                        <div>
                            {service_giver && (
                                <Link to={`/admin/userDetails/${service_giver.id}`}> {service_giver.name}</Link>
                            )}


                        </div>

                    )
                }
            }
        },
         {
            name: "service_receiver",
            label: "Service Receiver",
            options: {
                customBodyRender: (service_receiver, value) => {
                    return (
                        // <img src={`${ getImageBaseUrl() } / ${ value }`} style={{ width: '50px' }} / >
                        <div>
                            {service_receiver && (
                                <Link to={`/admin/userDetails/${service_receiver.id}`}> {service_receiver.name}</Link>
                            )}


                        </div>

                    )
                }
            }
        },
        {
            name: "call_time",
            label: "Call Duration",
        },
         {
            name: "call_price_withoutPercentage",
            label: "Price without Percentage",
        },
        {
            name: "call_price_withPercentage",
            label: "Price with Percentage",
        },
       
        {
            name: "profit",
            label: "Profit",
        },
         
        {
            name: "created_at",
            label: "Call Date",
            options: {
                customBodyRender: (created_at, value) => {
                    return (
                        // <img src={`${ getImageBaseUrl() } / ${ value }`} style={{ width: '50px' }} / >
                        <div>
                            {created_at && (
                                //conver to local date
                                <div>{new Date(created_at).toLocaleDateString()}</div>
                                //get clock time
                                

                            )}


                        </div>

                    )
                }
            }

        },

        // {
        //     name: "id",
        //     label: "Action",
        //     options: {
        //         filter: false,
        //         customBodyRender: (data, tableMeta) => {
        //             return (
        //                 <ActionDropdown
        //                     id={tableMeta.rowData[0]}
        //                     block_status={tableMeta.rowData[7]}

        //                 />




        //             )
        //         }
        //     }
        // }


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
                        <CardHeader color="warning">

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 className={classes.cardTitleWhite}>Call Records</h4>

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



export default CallRecords
