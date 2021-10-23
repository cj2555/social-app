import React from 'react'
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody';
import Api from 'util/Api';
import getImageBaseUrl from 'util/BaseUrl';
import { Col, Form, Row } from 'react-bootstrap';
 import Storage from 'util/Storage';
const ServiceById = ({ match }) => {

    const [service, setService] = React.useState();


    const serviceID = match.params.id;

    const fetchServiceDetails = async (id) => {
        const response = await Api(`/getServicesById/${id}`,
         {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                
        
        );
        if (response.data.success) {
            setService(response.data.data);
        }
        // console.log(data);
    }

    React.useEffect(() => {
        fetchServiceDetails(serviceID);
    }, []);
    return (
        <div>
            <Card>
                <CardHeader>
                    service details
                    <CardBody>
                        {service && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    marginBottom: '20px'
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {service.service_image && (

                                        <img
                                            src={`${getImageBaseUrl()}/${service.service_image}`}
                                            alt="service"
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '50%',
                                                marginBottom: '50px'
                                            }} />

                                    )}

                                    {service.short_video && (
                                        <video
                                            src={`${getImageBaseUrl()}/${service.short_video}`}
                                            style={{
                                                width: '200px',
                                                height: '200px',
                                                // borderRadius: '50%'
                                            }}
                                            controls
                                        />
                                    )}
                                </div>




                                <div
                                    style={{
                                        width: '50%',
                                    }}
                                >
                                    <Form
                                        style={{
                                            margin: '10px'
                                        }}
                                    >
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                name:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={service.name} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                description:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={service.description} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                service charge:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={service.service_charge} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                service status:
                                            </Form.Label>
                                            <Col sm="10">
                                                {service.service_status === 1 ? (
                                                    <Form.Control plaintext readOnly defaultValue="active" />
                                                ) : (
                                                    <Form.Control plaintext readOnly defaultValue="inactive" />
                                                )}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                block status:
                                            </Form.Label>
                                            <Col sm="10">
                                                {service.block_status == 1 ?
                                                    <Form.Control plaintext readOnly defaultValue="blocked" />
                                                    : <Form.Control plaintext readOnly defaultValue="unblocked" />}
                                            </Col>
                                        </Form.Group>
                                        
                                 <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                            <Form.Label column sm="2">
                                                rating:
                                            </Form.Label>
                                            <Col sm="10">
                                                <Form.Control plaintext readOnly defaultValue={service.rating ? service.rating.rating :0 }/>
                                            </Col>
                                        </Form.Group>
                                      

                                    </Form>
                                </div>


                            </div>
                        )}

                    </CardBody>
                </CardHeader>
            </Card >
            {/* json strigify  */}
            {/* <pre>{JSON.stringify(service, null, 2)}</pre> */}



        </ div>

    )
}

export default ServiceById
