import React, { useState } from 'react'
import { Form, Col, Modal, Row } from 'react-bootstrap'
import Button from 'components/CustomButtons/Button.js';
import Api from 'util/Api';
  import Storage from 'util/Storage';
const Addpackage = (props) => {

    const [packageData, setpackageData] = useState({});

    const createPackage = async (packData) => {
        // check if package name is not empty
        if (packData.name === '' || packData.price === null || packData.coin_numebr === null) {
            alert('all field required');
            return;
        }
        // check if packData.price is a number
        else if (isNaN(packData.price) || isNaN(packData.coin_numebr)) {
            alert('price or coin number must be a number');
            return;
        } else {
            try {
                let res = await Api.post('/createPackage', packData,
                    {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                
                )
                if (res.data.success) {
                    setpackageData({})
                    props.onHide();
                    props.onAdded();
                }
            } catch (err) {
                alert(err.message)
            }
        }




    }
    const handleHide = () => {
        setpackageData({})
        props.onHide();
    }

    return (
        <div>

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>package Name</Form.Label>
                                    <Form.Control type="text"  
                                        onChange={(e) => setpackageData({
                                            ...packageData, name: e.target.value
                                        })}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>package price</Form.Label>
                                    <Form.Control type="text"  
                                        onChange={(e) => setpackageData({
                                            ...packageData, price: e.target.value
                                        })}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label> number of coin</Form.Label>
                                    <Form.Control type="text"  
                                        onChange={(e) => setpackageData({
                                            ...packageData, coin_numebr: e.target.value
                                        })}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                    </Form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => createPackage(packageData)}  >
                        Save Changes
                    </Button>
                </Modal.Footer>
                {/* <pre>{JSON.stringify(packageData)}</pre> */}
            </Modal>
        </div>
    )
}

export default Addpackage
