import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import LocationOn from "@material-ui/icons/LocationOn";
import Api from 'util/Api';
import { Grid, IconButton, ListItemSecondaryAction } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@restart/ui/esm/Button';
import Addcountry from './Addcountry';
import EditIcon from '@material-ui/icons/Edit';
import UpdateModalForm from './UpdateModalForm';
import Storage from 'util/Storage';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CountryList() {
    const classes = useStyles();
    const [countries, setCountries] = React.useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [countryUpdateValue, setcountryUpdateValue] = React.useState('');
    const [countryUpdateId, setcountryUpdateID] = React.useState(null);

    const [updateModal, setupdateModal] = React.useState(false);

    const [keyHit, setkeyHit] = React.useState(null);


    const fetchCountry = async () => {
        try {
            const response = await Api.get('/allCountries',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                } 
            
            );
            if (response.data.success === true) {
                setCountries(response.data.data);
            }

        } catch (error) {
            alert(error.message);
        }
    }

    //DELETE LIST
    const deleteCountry = async (id) => {
        try {
            const response = await Api.delete(`deleteCountry/${id}`,
                {
                    headers: {
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
            );
            if (response.data.success === true) {
                fetchCountry();
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const openupdateModal = async (name, id) => {
        setcountryUpdateValue(name);
        setcountryUpdateID(id);
        setupdateModal(true);

    }

    React.useEffect(() => {
        fetchCountry();
    }, []);



    return (
        <div>
            <h3>Countries</h3>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button style={{
                        margin: '10px',
                    }}
                        onClick={() => setModalShow(true)}
                    >
                        <LocationOn color="primary" />
                        Add Country
                    </Button>
                </Grid>
                <Grid item xs={12}>



                    <List className={classes.root}>
                        {countries && countries.map((country, key) => (
                            <ListItem key={key}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <LocationOn />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={country.name} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete"
                                        onClick={() => { deleteCountry(country.id) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="edit"
                                        onClick={() => setkeyHit(key)}>

                                        <EditIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>

                                <UpdateModalForm
                                    show={key === keyHit}
                                    country_name={country.name}
                                    id={country.id}
                                    onHide={() => setkeyHit(null)}
                                    onAdded={() => fetchCountry()}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Addcountry
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        onAdded={() => fetchCountry()}
                    />
                </Grid>

                <Grid item xs={12}>
                    {/* <UpdateModalForm
                        show={updateModal}
                        country_name={countryUpdateValue}
                        id={countryUpdateId}
                        onHide={() => setupdateModal(false)}
                        onAdded={() => fetchCountry()}
                    /> */}
                </Grid>

            </Grid>
        </div >
    );
}
