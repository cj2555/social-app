import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { Box, Card } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, Form, Formik, useField, FieldArray } from 'formik'

import { Link } from "react-router-dom";
// import { Alert } from 'react-bootstrap';
import * as yup from 'yup';

import axios from 'axios'
import { Redirect } from "react-router-dom";
import Storage from 'util/Storage';
import Auth from 'util/Auth';
import Api from 'util/Api';
// import CircularProgression from 'components/ProgressBar/CircularProgression';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const validationSchema = yup.object({

    email: yup.string().email().required(),
    password: yup.string().required().min(8, 'Must be atleast 8 digits'),
})

export default function Login({ history }) {
    const classes = useStyles();
    //if login success state
    const [isLoginSuccess, setLoginSuccess] = useState(false);
    // make handleSubmit func
    const handleSubmit = async (values) => {
        try {


            let response = await Api.post('/login', values)
            Storage.setUserAndTOken(response.data.user, response.data.token)
            if (response.data.success) {
                Auth.login()
                setLoginSuccess(true)


            }
        } catch (error) {
            alert(error.message)

        }

    }
    return (
        <div>
            {isLoginSuccess ? (<Redirect to="/" />) : null}
            {/* {Auth.isLoggedIn() ? (<Redirect to="/" />) : null} */}
            {/* {response &&
                Object.entries(response).map((t, k) => <Alert variant='danger' key={k} value={t[0]}>{t[1]}</Alert>)
            } */}
            < Formik
                validateOnChange={true}
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (data, { setSubmitting }) => {
                    setSubmitting(true);

                    let posts = new FormData();

                    posts.append('email', data.email);
                    posts.append('password', data.password);

                    await handleSubmit(posts)
                    // setSubmitting(false);

                }}

            >


                {({ values, errors, touched, isSubmitting, handleChange, handleSelect, setFieldValue }) => (
                    <div>

                        <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Form >
                                <div className={classes.form}>
                                    <TextField

                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={values.email}
                                        onChange={handleChange}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={values.password}
                                        onChange={handleChange}
                                        error={touched.password && Boolean(errors.password)}
                                        helperText={touched.password && errors.password}
                                    />

                                    <Link to="register">register</Link>




                                    <Box mt={10}>
                                        <Button color="default" variant="contained" type="submit">
                                            Submit
                                        </Button></Box>
                                </div>

                                {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}


                            </Form>
                        </div>
                    </div>

                )}



            </Formik>


        </div>
    );
}