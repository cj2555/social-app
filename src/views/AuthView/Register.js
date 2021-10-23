import React, { useState, useEffect } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Field, Form, Formik, useField, FieldArray } from 'formik'
import * as yup from 'yup';
import axios from 'axios'
// import Api from "../../util/Api";
// import auth from "../../util/Auth";
import { Redirect } from "react-router-dom";
// import { Alert } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Storage from 'util/Storage';
import Auth from 'util/Auth';
import Api from 'util/Api';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const validationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, 'Must be atleast 8 digits'),
})
export default function Register({ history }) {

    const classes = useStyles();
    //ISREGISTERED STATE
    const [isRegistered, setIsRegistered] = useState(false);
    const handleSubmit = async (val) => {
        try {
            const response = await Api.post('/register', val,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }
            )
            Storage.setUserAndTOken(response.data.user, response.data.token)
            Auth.login()
            setIsRegistered(response.data.success)


        } catch (error) {
            alert(error.message)

        }
    }


    return (
        <div>
            {isRegistered ? (<Redirect to="/" />) : null}
            {Auth.isLoggedIn() ? (<Redirect to="/" />) : null}
            <Container component="main" maxWidth="xs">


                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    {/* {response &&
                        Object.entries(response).map((t, k) => <Alert variant='danger' key={k} value={t[0]}>{t[1]}</Alert>)
                    } */}
                    <Formik
                        validateOnChange={true}
                        initialValues={{
                            name: "",
                            email: "",
                            password: "",




                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);

                            let posts = new FormData();
                            posts.append('name', data.name);
                            posts.append('email', data.email);
                            posts.append('password', data.password);

                            handleSubmit(posts)
                            setSubmitting(false);

                        }}

                    >


                        {({ values, errors, touched, isSubmitting, handleChange, handleSelect, setFieldValue }) => (
                            <div>

                                <CssBaseline />
                                <div className={classes.paper}>


                                    <Form >
                                        <div className={classes.form}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} >
                                                    <TextField
                                                        autoComplete="name"
                                                        name="name"
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="name"
                                                        label="Your Name"
                                                        autoFocus
                                                        value={values.name}
                                                        onChange={handleChange}
                                                        error={touched.name && Boolean(errors.name)}
                                                        helperText={touched.name && errors.name}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        fullWidth
                                                        id="email"
                                                        label="Email Address"
                                                        name="email"
                                                        autoComplete="email"
                                                        value={values.email}
                                                        onChange={handleChange}
                                                        error={touched.email && Boolean(errors.email)}
                                                        helperText={touched.email && errors.email}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        variant="outlined"
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
                                                </Grid>

                                                <Link to="login">login</Link>

                                            </Grid>
                                            <Box mt={10}>
                                                <Button color="default" variant="contained" type="submit">
                                                    Submit
                                                </Button></Box>
                                        </div>




                                    </Form>
                                </div>
                            </div>

                        )}
                    </Formik>


                </div>

            </Container>
        </div>
    );
}




