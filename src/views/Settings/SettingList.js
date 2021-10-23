import React, { useState, useEffect } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import Card from 'components/Card/Card.js';
import GridContainer from 'components/Grid/GridContainer';
import Grid from '@material-ui/core/Grid';
import CardHeader from 'components/Card/CardHeader';
import Button from 'components/CustomButtons/Button.js';
import Api from 'util/Api';
import Storage from 'util/Storage';
const SettingList = () => {
    const [editMode, seteditMode] = useState(false);
    const [settings, setSettings] = useState({});


    const getSettings = async () => {
        let res = await Api.get('/getSettings',
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
        )
        if (res.data.success) {
            setSettings(res.data.data)
        }

    }

    const updateSettings = async () => {

        //formdata
        // let formData = new FormData();
        // formData.append('fcm_key', settings.fcm_key);
        // formData.append('about', settings.about);
        // formData.append('admin_percentage', settings.admin_percentage);



        let res = await Api.post('/updateSetting', settings,
        {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
                
        )
        if (res.data.success) {
            alert('Settings updated successfully')
            //reload the page
            window.location.reload();
        }

    }

    useEffect(() => {
        
         getSettings()
    }, [])

    return (
        <div>
            <Card>

                {/* //card header */}
                <CardHeader color="primary">
                    <h4 >Settings</h4>
                </CardHeader>
                <Form>
                    <div
                        //margin around
                        style={{
                            margin: '30px',
                        }}
                    >

                        <Row className="mb-5">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>FCM Key</Form.Label>
                                <Form.Control disabled={!editMode} type="text"
                                    value={settings.fcm_key ? settings.fcm_key : ''}
                                    onChange={(e) => {
                                        setSettings({ ...settings, fcm_key: e.target.value })
                                    }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>About us</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    disabled={!editMode} type="text"
                                    value={settings.about ? settings.about : ''}
                                    onChange={(e) => {
                                        setSettings({ ...settings, about: e.target.value })
                                    }}
                                />
                                
                            </Form.Group>
                        </Row>

                        <Row className="mb-5">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Admin Percentage</Form.Label>
                                <Form.Control disabled={!editMode} type="text"
                                    style={{ width: '50%' }}
                                value={settings.admin_percentage? settings.admin_percentage : null}
                                    onChange={(e) => {
                                        setSettings({ ...settings, admin_percentage: e.target.value })
                                    }}
                                />
                                
                            </Form.Group>

                            {/* <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control disabled={!editMode} type="password" placeholder="Password" />
                            </Form.Group> */}
                        </Row>
                        
                        



                    </div>
                    <div
                        // push to left
                        style={{
                            float: 'right',
                            marginRight: '30px',
                            marginBottom: '30px',
                        }}
                    >
                        <Button variant="primary"
                            onClick={() => seteditMode(!editMode)}
                            style={{
                                display: editMode ? 'none' : null,
                            }}
                        >Edit</Button>
                        <Button
                            style={{
                                display: editMode ? null : 'none',
                            }}
                            variant="primary"
                            onClick={updateSettings}
                        > Update </Button>

                    </div>
                </Form>
            </Card>
            <pre>
                {/* {JSON.stringify(settings, null, 2)} */}
            </pre>

        </div >
    )
}

export default SettingList
