import React, { useState } from 'react'
import { Form, Col, Modal, Row } from 'react-bootstrap'
import Button from 'components/CustomButtons/Button.js';
import Api from 'util/Api';
import Storage from 'util/Storage';

const ReplyToMsg = (props) => {

    const [msg, setmsg] = useState('');

    const sendMessage = async (repltmsg) => {
        // check if package name is not empty
        if (msg === '') {
            alert('all field required');
            return;
        }
        // check if packData.price is a number
        else {
            let formData = new FormData();
            formData.append('reply', msg);
            formData.append('msgId', props.msgId);
            try {
                let res = await Api.post('/reply', formData,
                      {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                )
                if (res.data.success) {
                    // setmsgBody({})
                    props.onHide();
                    props.onAdded(); 
                }
            } catch (err) {
                alert(err.message)
            }
        }




    }
    const handleHide = () => {
        // setmsgBody({})
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
                    <Modal.Title>Reply to Msg</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>reply {props.msgId}</Form.Label>
                                    <Form.Control as="textarea" placeholder="Enter reply"
                                        onChange={(e) => setmsg(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>

                    </Form></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleHide}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => sendMessage(msg)}  >
                        reply
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ReplyToMsg
