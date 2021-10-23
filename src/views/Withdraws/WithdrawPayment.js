import React, { useEffect, useState } from 'react'
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader';
import Api from 'util/Api';
import CardBody from 'components/Card/CardBody';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { Col, Form, Row } from 'react-bootstrap';
import getImageBaseUrl from 'util/BaseUrl';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
  import Storage from 'util/Storage';
const WithdrawPayment = ({ match }) => {

    const history = useHistory();
    const withdrawId = match.params.wid;
    const [withdrawDetails, setwithdrawDetails] = useState({});

    const [paymentDetails, setpaymentDetails] = useState({});

    const getWIthdrawDetails = async () => {
        try {
            const response = await Api(`/withdrawDetails/${withdrawId}`,
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            
            );
            if (response.data.success) {
                setwithdrawDetails(response.data.data);
            }

        } catch (error) {
            alert(error.message);
        }

    }

    const payUser = async (details) => {

        try {
            let res = await Api.post(`/approveWithdraw/${withdrawId}`, details,
                 {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                 
            
            );
            if (res.data.success) {
                alert('Payment Successful');
                history.push('/withdraws');
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            alert(error.message);
        }

    }

    useEffect(() => {
        getWIthdrawDetails(withdrawId);
    }, []);

    return (
        <div>
            {withdrawDetails && (
                <Card>
                    <CardHeader
                        style={{
                            backgroundColor: '#ffc107',
                            color: '#fff'
                        }}
                    >
                        Pay User
                    </CardHeader>

                    <CardBody>

                        <GridContainer
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <GridItem>
                                <Card
                                    style={{
                                        width: '700px',
                                        marginLeft: '80px',
                                    }}
                                >
                                    <CardBody
                                        style={{
                                            margin: '30px',

                                        }}
                                    >
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Label>transaction id</Form.Label>
                                                <Form.Control type="text" placeholder="transaction id"
                                                    onChange={
                                                        (e) => {
                                                            setpaymentDetails({
                                                                ...paymentDetails,
                                                                transaction_id: e.target.value
                                                            })
                                                        }
                                                    }
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                <Form.Label>comment</Form.Label>
                                                <Form.Control as="textarea" rows={3}

                                                    onChange={
                                                        (e) => {
                                                            setpaymentDetails({
                                                                ...paymentDetails,
                                                                comment: e.target.value
                                                            })
                                                        }
                                                    }
                                                />
                                            </Form.Group>

                                            <Button
                                                style={{
                                                    backgroundColor: '#ffc107',
                                                    color: '#fff',
                                                    marginTop: '20px',
                                                    marginLeft: '20px',
                                                    width: '200px',
                                                }}

                                                onClick={() => {
                                                    payUser(paymentDetails);
                                                }}
                                            >Submit</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem
                            >
                                <Card
                                    style={{
                                        width: '450px',
                                        marginRight: '100px',
                                    }}
                                >
                                    <CardBody>
                                        {withdrawDetails.user && (
                                            <div
                                                style={{
                                                    marginLeft: '140px',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    marginBottom: '60px'
                                                }}
                                            >
                                                <img
                                                    src={`${getImageBaseUrl()}/${withdrawDetails.user.profile_pic}`}
                                                    alt="withdraw"
                                                    style={{
                                                        width: '150px',
                                                        height: 'auto',
                                                        objectFit: 'cover',
                                                        borderRadius: '50%'
                                                    }}
                                                />
                                            </div>
                                        )}

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                user
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {withdrawDetails.user &&

                                                        (
                                                            <Link
                                                                to={`/admin/userDetails/${withdrawDetails.user.id}`}
                                                            >
                                                                {withdrawDetails.user.name}
                                                            </Link>
                                                        )


                                                    }
                                                </Form.Text>
                                            </Col>
                                        </Form.Group>

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="2">
                                                amount
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {withdrawDetails.amount && withdrawDetails.amount}

                                                </Form.Text>
                                            </Col>
                                        </Form.Group>
                                        
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="5">
                                               payment_method
                                            </Form.Label>
                                            <Col sm="10" >
                                                <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {withdrawDetails.payment_method && withdrawDetails.payment_method}

                                                </Form.Text>
                                            </Col>
                                        </Form.Group>

                                                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="5">
                                               account_name
                                            </Form.Label>
                                            <Col sm="10" >
                                                <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {withdrawDetails.account_name && withdrawDetails.account_name}

                                                </Form.Text>
                                            </Col>
                                        </Form.Group>
                                             <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="5">
                                               account_number
                                            </Form.Label>
                                            <Col sm="10" >
                                                <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {withdrawDetails.account_number && withdrawDetails.account_number}

                                                </Form.Text>
                                            </Col>
                                        </Form.Group>
                                        
                                        

                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                            <Form.Label column sm="5">
                                                withdraw request date
                                            </Form.Label>
                                            <Col sm="10" >
                                                <Form.Text className="text-muted" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                    {withdrawDetails.created_at &&
                                                        new Date(withdrawDetails.created_at).toLocaleDateString()}

                                                </Form.Text>
                                            </Col>
                                        </Form.Group>
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer>


                    </CardBody>
                    <pre>
                        {/* {JSON.stringify(withdrawDetails, null, 2)} */}
                    </pre>
                </Card>


            )
            }

        </div >
    )
}
export default WithdrawPayment
