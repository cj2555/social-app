import React, { useState, useEffect } from 'react'
import Api from 'util/Api';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import GridContainer from 'components/Grid/GridContainer';
import { Badge } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import Addpackage from './Addpackage';
  import Storage from 'util/Storage';
const PackageList = () => {
    const [packageList, setpackageList] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const getPackageList = async () => {

        try {
            let res = await Api.get('/getCreditPackages',
               {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            );

            if (res.data.success) {
                setpackageList(res.data.data);
            }
        } catch (e) {
            alert(e.message);
        }

    }

    const deletePackage = async (id) => {
        try {
            let res = await Api.delete(`/deletePackage/${id}`,
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            
            );

            if (res.data.success) {
                getPackageList();
            }
        } catch (e) {
            alert(e.message);
        }
    }

    useEffect(() => {
        getPackageList()
    }, []);
    return (
        <div>

            <Card>
                <CardHeader
                    style={{
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    Package List
                </CardHeader>
                <CardBody>
                    <div
                        style={{
                            marginBottom: '100px',
                        }}
                    >
                        <Button
                            style={{
                                float: 'right',
                                backgroundColor: '#3f51b5',
                                color: '#fff',
                            }}
                            onClick={handleShow}
                        >
                            Add package
                        </Button>
                    </div>
                    <GridContainer>
                        {packageList.map((item, index) => {
                            return (
                                <div key={index} >
                                    <div className="card"
                                        style={{
                                            // width: '50%',
                                            // marginBottom: '10px',
                                            // backgroundColor: '#f5f5f5',
                                            // borderRadius: '5px',
                                            // padding: '10px'
                                            margin: '10px'
                                        }}
                                    >
                                        <div className="card-header">
                                            {/* //cross icon for delete */}
                                            <div
                                                style={{
                                                    float: 'right',
                                                    marginTop: '-5px',
                                                    marginRight: '-5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                <i
                                                    className="fa fa-times"
                                                    style={{
                                                        color: '#f00',
                                                        fontSize: '20px'
                                                    }}
                                                    onClick={()=>deletePackage(item.id)}
                                                ></i>
                                            </div>
                                                            
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">package name : <Badge>{item.package_name}</Badge></h5>
                                            <p className="card-text">package price :{item.package_price}</p>
                                            <p className="card-text">number of coin :{item.number_of_coin}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </GridContainer>
                </CardBody>
            </Card>

            <Addpackage
                show={show}
                onHide={handleClose}
                onAdded={() => getPackageList()}
            />

        </div>
    )
}

export default PackageList