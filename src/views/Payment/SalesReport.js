import react, { useState, useEffect } from 'react';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React from 'react'
import { Card } from 'react-bootstrap';
import Api from 'util/Api';
import Storage from 'util/Storage';
const SalesReport = () => {

    const [saleReport, setsaleReport] = useState({});


    const getSalesReport = async () => {

        let res = await Api.get('/saleData',
         {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
        );
        if (res.data.success) {
            setsaleReport(res.data.data);
        }
    }



    useEffect(() => {
        getSalesReport();
    }, []);


    return (
        <div>
            <Card>
                <Card.Header
                    style={{
                        // blue back ground color
                        backgroundColor: '#00bcd4',
                    }}
                >Sales Report</Card.Header>
                <Card.Body>
                    {saleReport && (
                        <GridContainer
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            <GridItem>
                                <Card
                                    style={{
                                        width: '250px',

                                    }}
                                >

                                    <Card.Body
                                        style={{
                                            backgroundColor: '#3f51b5',
                                            color: 'white',
                                        }}
                                    >
                                        <Card.Title>Total Purchase</Card.Title>
                                        <Card.Text>
                                            {saleReport.totalPurchase}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Card
                                    style={{
                                        width: '250px',
                                    }}
                                >

                                    <Card.Body
                                        style={{
                                            backgroundColor: '#FF7F50',
                                            color: 'white',
                                        }}
                                    >
                                        <Card.Title>Purchase This Month</Card.Title>
                                        <Card.Text>
                                            {saleReport.totalPurchaseThisMonth}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Card
                                    style={{
                                        width: '250px',
                                    }}
                                >

                                    <Card.Body
                                        style={{
                                            backgroundColor: '#40E0D0',
                                            color: 'white',
                                        }}
                                    >
                                        <Card.Title>Purchase Today</Card.Title>
                                        <Card.Text>
                                            {saleReport.totalPurchaseToday}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </GridItem>
                            <GridItem>
                                <Card
                                    style={{
                                        width: '250px',
                                    }}
                                >

                                    <Card.Body
                                        style={{
                                            backgroundColor: '#DE3163',
                                            color: 'white',
                                        }}
                                    >
                                        <Card.Title>Purchase This Week</Card.Title>
                                        <Card.Text>
                                            {saleReport.totalPurchaseThisWeek}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </GridItem>
                        </GridContainer>
                    )}


                </Card.Body>
            </Card>
        </div>
    )
}

export default SalesReport
