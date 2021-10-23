import GridContainer from 'components/Grid/GridContainer'
import React, { useEffect, useState } from 'react'
import { Options } from './currecnyTableBody.'
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import Button from 'components/CustomButtons/Button.js';
import MUIDataTable from 'mui-datatables';
import GridItem from 'components/Grid/GridItem.js';
import Api from 'util/Api';
import AddCurrency from './AddCurrency';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
import UpdateCurrency from './UpdateCurrency';
import Storage from 'util/Storage';

const CurrencyList = () => {
    const [rows, serRows] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    // const [modalShowUpdate, setModalShowUpdate] = React.useState(false);
    const [selectedrow, setSelectedRow] = useState('');

    const handleshow = (id) => {

        setModalShowUpdate(true);

    }
    const getCurrencyList = async () => {
        try {
            const response = await Api.get('/currencyList',
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            )
            if (response.data.success) {
                serRows(response.data.data)

            }
        } catch (error) {
            alert(error.message)
        }

    }
    //DELETE LIST
    const deleteCurrency = async (id) => {
        try {
            const response = await Api.delete(`deleteCurrency/${id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            );
            if (response.data.success === true) {
                getCurrencyList();
            }
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        getCurrencyList()
    }, [])
    const Columns = [
        {
            name: 'id',
            label: 'ID',
        },
        {
            name: "country",
            label: "Country",
        },
        {
            name: "currency_name",
            label: "Currency name",
        },
        {
            name: "currency_value",
            label: "Currency value",
        },


        {
            //use all row data
            name: "id",
            label: "Edit",
            options: {
                filter: false,
                // show current row data

                customBodyRender: (value, tableMeta, updateValue, actions, rowIndex) => {
                    return (
                        <div>

                            {/* //how row data */}
                            {/* {tableMeta.rowData[0]} */}
                            {/* {tableMeta.rowIndex} */}
                            <IconButton>
                                <EditIcon
                                    onClick={() => setSelectedRow(tableMeta.rowIndex)}
                                >Edit Category</EditIcon>
                            </IconButton>

                            <GridItem xs={12} sm={12} md={6} >
                                <UpdateCurrency
                                    country={tableMeta.rowData[1]}
                                    currency_name={tableMeta.rowData[2]}
                                    currency_value={tableMeta.rowData[3]}
                                    id={tableMeta.rowData[0]}
                                    show={selectedrow === tableMeta.rowIndex}
                                    onHide={() => setSelectedRow(null)}
                                    onAdded={() => getCurrencyList()}
                                />

                            </GridItem>
                            {/* open modal inly for this row */}

                        </div >
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
                            <DeleteOutlineIcon onClick={() => deleteCurrency(id)} color="primary" />

                        </IconButton>



                    )
                }
            }
        }


    ]
    return (
        <div>
            <GridContainer
            >
                <GridItem xs={12} sm={12} md={10}
                    // margin left
                    style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <Card>
                        <CardHeader color="warning">

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h4>
                                    <b>Currency List</b></h4>
                                <Button
                                    style={{
                                        marginLeft: '80px',
                                        marginTop: '30px',
                                        //button color green
                                        color: 'white',
                                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                                    }}
                                    onClick={() => setModalShow(true)}

                                >Add Currency</Button>
                            </div>
                        </CardHeader>
                        {/* <CardBody> */}

                        {/* div with margin around */}


                        <MUIDataTable
                            className=""
                            data={rows}
                            columns={Columns}
                            options={Options}
                        />
                        {/* </CardBody> */}
                    </Card>



                    <GridItem xs={12} sm={12} md={6} >
                        <AddCurrency
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            //rerender when added category
                            onAdded={() => getCurrencyList()}
                        />

                    </GridItem>
                    {/* <GridItem xs={12} sm={12} md={6} >
                        <UpdateCurrency

                            show={modalShowUpdate}
                            onHide={() => setModalShowUpdate(false)}
                            //rerender when added category
                            onAdded={() => getCurrencyList()}
                        />

                    </GridItem> */}
                </GridItem>
            </GridContainer>

        </div >
    )
}

export default CurrencyList
