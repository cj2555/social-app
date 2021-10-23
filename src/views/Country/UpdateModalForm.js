import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import Storage from 'util/Storage';
import Api from 'util/Api';
import { bgImage } from 'assets/img/sidebar-2.jpg';

function UpdateModalForm(props) {


    const [updateName, setUpdateName] = React.useState(props.country_name);

    React.useState(() => {
        setUpdateName(props.country_name)
    }, [props.country])

    //function that make axios request to add category 
    const updateCountry = async () => {
        try {
            const formData = new FormData();
            formData.append('id', props.id);
            formData.append('name', updateName);
            const res = await Api.post('/updateCountries', formData
                , {
                    headers: {
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            )
            if (res.data.success) {
                props.onHide()
                props.onAdded()
            }

        } catch (err) {
            alert(err.message)
        }
    }

    const handleClose = () => {
        // setCountryName('')
        props.onHidee()
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
                    updates  {props.country_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="ewe">
                                <Form.Label>Country Name</Form.Label>
                                <input type="text" className="form-control" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={updateCountry}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default UpdateModalForm
