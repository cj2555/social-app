import Card from 'components/Card/Card'
import CardBody from 'components/Card/CardBody'
import CardHeader from 'components/Card/CardHeader'
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React from 'react'

//make style
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { IconButton, makeStyles } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import Table from 'components/Table/Table.js';
import MUIDataTable from 'mui-datatables'
import axios from 'axios'
import MyVerticallyCenteredModal from 'components/Modal/MyVerticallyCenteredModal'
import Button from '@material-ui/core/Button';
import Addcategory from './Addcategory'
import Api from 'util/Api';
import Storage from 'util/Storage'
import getImageBaseUrl from 'util/BaseUrl'
import EditIcon from '@material-ui/icons/Edit';
import UpdateCategory from './UpdateCategory'


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
const CategoryList = () => {
    const classes = useStyles()
    const [modalShow, setModalShow] = React.useState(false);
    const [rows, setRow] = React.useState()
    const [updateRowID, setupdateRowID] = React.useState(false)


    const FetchCategory = async () => {
        try {
            const res = await Api.get('/allCategories',
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            
            )

            //iff response has success true set row as response.data.data
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
            await Api.get(`/deleteCategory/${id}`, {
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

    const columns = [
        {
            name: "name",
            label: "Category",
        },
        {
            name: "description",
            label: "Description",
        },
        {
            name: "image",
            label: "image",
            options: {
                customBodyRender: (value) => {
                    return (
                        <img src={`${getImageBaseUrl()}/${value}`} style={{ width: '50px' }} />
                    )
                }
            }
        },
        {
            name: "id",
            label: "Edit",
            options: {
                filter: false,
                customBodyRender: (id, tableMeta) => {
                    return (
                        <div>
                            <IconButton>
                                <EditIcon color="primary"
                                    //onlcik change state updateRowid as current row 
                                    onClick={() => {
                                        setupdateRowID(id)
                                    }}
                                />

                            </IconButton>

                            <UpdateCategory
                                id={id}
                                name={tableMeta.rowData[0]}
                                description={tableMeta.rowData[1]}
                                show={updateRowID === id}
                                onHide={() => setupdateRowID(false)}
                                onAdded={() => FetchCategory()}

                            />
                        </div>
                    )
                }
            }
        },
        {
            name: "id",
            label: "Delete",
            options: {
                filter: false,
                customBodyRender: (id) => {
                    return (
                        <IconButton>
                            <DeleteIcon onClick={() => DeleteCategory(id)} color="primary" />
                        </IconButton>


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
                                <h4 className={classes.cardTitleWhite}>Category List</h4>
                                <Button
                                    style={{
                                        marginLeft: '80px',
                                        marginTop: '30px',
                                        color: 'white',
                                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    }}
                                    onClick={() => setModalShow(true)}

                                >Add Category</Button>
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


                        <Addcategory
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

export default CategoryList
