import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import Storage from 'util/Storage';
import Api from 'util/Api';
import { bgImage } from 'assets/img/sidebar-2.jpg';


function UpdateCurrency(props) {

    const [currencyName, setcurrencyName] = useState(props.currency_name);
    const [currencyValue, setcurrencyValue] = useState(props.currency_value);
    const [country, setCountry] = useState(props.country);
    const [countryList, setcountryList] = useState([]);


    //function that make axios request to add category 
    const addCategory = async () => {
        try {
            const formData = new FormData();
            formData.append('id', props.id);
            formData.append('country', country);
            formData.append('currency_name', currencyName);
            formData.append('currency_value', Number(currencyValue));
            console.log(formData);

            const res = await Api.post('/updateCurrency', formData, {
                headers: {
                    'Authorization': 'Bearer ' + Storage.getToken()
                }
            })
            //clear states

            //rerender the parent component
            if (res.data.success) {
                handleClose()
                // alert('Currency Added Successfully');
            }
            // props.onHide()

            props.onAdded()

        } catch (err) {
            alert(err.message)
        }
    }

    const handleClose = () => {
        // setcurrencyName('');
        // setcurrencyValue('');
        // setCountry('');
        props.onHide()

    }
    const getCountries = async () => {
        try {
            const response = await Api.get('/allCountries',
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            )
            if (response.data.success) {
                setcountryList(response.data.data)
            }
        } catch (err) {
            alert(err.message)
        }
    }

    useEffect(() => {


        getCountries()



    }, [props.currencyName])
    return (
        <Modal
            {...props}
            size="lg"
            aria- labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.country}
                    {props.id}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    height: '300px',

                }}
            >
                <Form>
                    <Row  >


                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Country</Form.Label>
                            <Form.Select aria-label="Default select example"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                {countryList.map((country, index) => (
                                    //IF PROPS COUNTRY IS EQUAL TO COUNTRY NAME THEN SELECTED
                                    <option key={index} value={country.name} selected={country.name === props.country}>{country.name}</option>
                                ))}

                            </Form.Select>
                        </Form.Group>



                        <Form.Group controlId="formBasicPassword"
                            style={{ marginTop: '20px' }}

                        >
                            <Form.Label>Currency Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Currency name"
                                value={currencyName}
                                onChange={(e) => setcurrencyName(e.target.value)}
                                style={{ height: '60px' }}
                            />
                        </Form.Group>


                        <Form.Group controlId="formBasicPassword"
                            style={{ marginTop: '20px' }}
                        >
                            <Form.Label>Currency Value</Form.Label>
                            <Form.Control type="text" style={{
                                height: '60px',
                            }} placeholder="Enter Currency Value" value={currencyValue} onChange={(e) => setcurrencyValue(e.target.value)} />
                        </Form.Group>

                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer
                style={{ marginTop: '30px' }}

            >
                <Button onClick={() => handleClose()}>Close</Button>
                <Button onClick={addCategory}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}

export default UpdateCurrency
