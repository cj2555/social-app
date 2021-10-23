import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import Storage from 'util/Storage';
import Api from 'util/Api';
import { bgImage } from 'assets/img/sidebar-2.jpg';


function UpdateCategory(props) {

    const [categoryName, setcategoryName] = useState(props.name);
    const [categoryDescription, setcategoryDescription] = useState(props.description);
    const [id, setId] = useState(props.id);

    const [categoryImage, setcategoryImage] = useState(null);

    //function that make axios request to add category 
    const addCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('categoryName', categoryName);
            formData.append('id', id);
            formData.append('categoryDescription', categoryDescription);
            formData.append('image', categoryImage);
            await Api.post('/updateCategory', formData, {
                headers: {
                    'Authorization': 'Bearer ' + Storage.getToken()
                }
            })
            props.onHide()
            props.onAdded()

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
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Category Name" value={categoryName} onChange={(e) => setcategoryName(e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Category Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Category Description" value={categoryDescription} onChange={(e) => setcategoryDescription(e.target.value)} />
                            </Form.Group>
                        </Col>
                        {/* upload image */}
                        <Col>
                            <Form.Group controlId="formBasicImage">
                                <Form.Label>Category Image</Form.Label>
                                <Form.Control type="file" placeholder="Enter Category Image" onChange={(e) => setcategoryImage(e.target.files[0])} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
                <Button onClick={addCategory}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default UpdateCategory
