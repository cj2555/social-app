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
import Addservice from './Addservice'


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
const ServiceList = () => {
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
            const res = await Api.get('/allService',
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
            const response = await Api.get(`/service/handleBlock/${id}`,
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
            name: "name",
            label: "Name",
        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "user",
            label: "user",
            options: {
                customBodyRender: (user, value) => {
                    return (
                        // <img src={`${ getImageBaseUrl() } / ${ value }`} style={{ width: '50px' }} / >
                        <div>{user.name}</div>
                    )
                }
            }
        },
        {
            name: "category",
            label: "Category",
            options: {
                filter: false,
                customBodyRender: (category, tableMeta) => {
                    return (
                        <div>
                            {category.name}
                            {/* <IconButton>
                                <EditIcon color="primary"
                                    //onlcik change state updateRowid as current row 
                                    onClick={() => {
                                        setupdateRowID(id)
                                    }}
                                />

                            </IconButton> */}

                            {/* <UpdateCategory
                                id={id}
                                name={tableMeta.rowData[0]}
                                description={tableMeta.rowData[1]}
                                show={updateRowID === id}
                                onHide={() => setupdateRowID(false)}
                                onAdded={() => FetchCategory()}

                            /> */}
                            { }
                        </div>
                    )
                }
            }
        },
         {
            name: "totalRating",
            label: "Rating",
        },
        
        {
            name: "service_image",
            label: "IMAGE",
            options: {
                filter: false,
                customBodyRender: (service_image) => {
                    return (
                        // <IconButton>
                        //     {/* <DeleteIcon onClick={() => DeleteCategory(id)} color="primary" /> */}
                        // </IconButton>
                        <img src={`${getImageBaseUrl()}/${service_image}`} style={{ width: '50px' }} />


                    )
                }
            }
        },
        {
            name: "service_charge",
            label: "Price",
        },
        {
            name: "block_status",
            label: "Status",
            options: {
                customBodyRender: (block_status) => {
                    return (
                        //if the user is blocked then show the unblock button
                        block_status === 1 ?
                            //badge with blocked status
                            <Badge bg="danger">Blocked</Badge>
                            :
                            <Badge bg="success">Active</Badge>
                    )
                },
            }
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
                <GridItem xs={12} sm={12} md={10}
                    // margin left
                    style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <Card>
                        <CardHeader color="warning">

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4 className={classes.cardTitleWhite}>Service List</h4>
                                {/* <Button
                                    style={{
                                        marginLeft: '80px',
                                        marginTop: '30px',
                                        color: 'white',
                                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    }}
                                    onClick={() => setModalShow(true)}

                                >Add Service</Button> */}
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


                        <Addservice
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onAdded={() => FetchCategory()}
                        />

                    </GridItem>
                </GridItem>
            </GridContainer>

        </div >
    )


}



export default ServiceList
