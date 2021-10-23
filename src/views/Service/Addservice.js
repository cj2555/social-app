import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import Storage from 'util/Storage';
import Api from 'util/Api';
import { bgImage } from 'assets/img/sidebar-2.jpg';

function Addservice(props) {

    const [countryName, setCountryName] = useState('');

    //function that make axios request to add category 
    const postCountry = async () => {
        try {
            //CHECK IF FIELD ARE FILLED
            if (countryName === '') {
                alert('Please fill all fields');
                return;
            } else {
                const formData = new FormData();
                formData.append('name', countryName);
                await Api.post('/createCountry', formData
                    , {
                        headers: {
                            'Authorization': 'Bearer ' + Storage.getToken()
                        }
                    }
                )
                //clear state
                setCountryName('');
                props.onHide()
                props.onAdded()
            }


        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria- labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Country
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Country Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Category Name" value={countryName} onChange={(e) => setCountryName(e.target.value)} />
                            </Form.Group>
                        </Col>

                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                {/* <Button onClick={postCountry}>Submit</Button> */}
            </Modal.Footer>
        </Modal >
    );
}

export default Addservice
