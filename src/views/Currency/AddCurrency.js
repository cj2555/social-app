import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Form, Row } from 'react-bootstrap';
import Storage from 'util/Storage';
import Api from 'util/Api';
import { bgImage } from 'assets/img/sidebar-2.jpg';


function AddCurrency(props) {

    const [currencyName, setcurrencyName] = useState('');
    const [currencyValue, setcurrencyValue] = useState(null);
    const [country, setCountry] = useState('');
    const [countryList, setcountryList] = useState([]);



    //function that make axios request to add category 
    const addCategory = async () => {
        try {

            //check if all fields are filled
            if (currencyName === '' || currencyValue === null || country === '') {
                alert('fill all the field')
                return;
            } else {
                const formData = new FormData();
                formData.append('country', country);
                formData.append('currency_name', currencyName);
                formData.append('currency_value', Number(currencyValue));
                console.log(formData);

                const res = await Api.post('/addCurrency', formData, {
                    headers: {
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                })

                if (res.data.success) {
                    handleClose()
                }
                // props.onHide()

                props.onAdded()
            }


        } catch (err) {
            alert(err.message)
        }
    }

    const handleClose = () => {
        setcurrencyName('');
        setcurrencyValue('');
        setCountry('');
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
        if (props.country) {
            setCountry(props.Country)
            setcurrencyName(props.CurrencyName)
            setcurrencyValue(props.CurrencyValue)
        }
        getCountries()


    }, [props.Country, props.CurrencyName, props.CurrencyValue])
    return (
        <Modal
            {...props}
            size="lg"
            aria- labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Currency
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
                                <option value="">Select Country</option>
                                {countryList.map((country, index) => (
                                    <option key={index} value={country.name}>{country.name}</option>
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

export default AddCurrency
