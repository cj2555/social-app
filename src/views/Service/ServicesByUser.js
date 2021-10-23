import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import { makeStyles } from "@material-ui/core/styles";

import Api from 'util/Api';
import getImageBaseUrl from 'util/BaseUrl';
// import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from "@material-ui/core/Icon";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { Link } from 'react-router-dom';

const useStyles = makeStyles(styles);

const ServicesByUser = ({ services }) => {

    const classNamees = useStyles();

    return (
        <div>
            <Card>
                <CardBody>

                    <div classNameName=""
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            margin: '0 auto',
                            width: '100%'
                        }}>


                        {services && services.map(service => (
                            //make a card with horizontal IMAGE

                            <div className="container-fluid"
                                style={{
                                    width: '50%',
                                }}
                            >
                                <Link to={`/admin/serviceById/${service.id}`}>
                                    <div className="row"

                                    >
                                        <div className="col-12 mt-3" >
                                            <div className="card"
                                                style={{
                                                    backgroundColor: '#f5f5f5',
                                                }}
                                            >
                                                <div className="card-horizontal"
                                                    style={{
                                                        display: 'flex',
                                                    }}>
                                                    <div className="img-square-wrapper">
                                                        <img className=""
                                                            // unplash image
                                                            src={`${getImageBaseUrl()}/${service.service_image}`}
                                                            alt="Card image cap"
                                                            style={{
                                                                width: '200px',
                                                                height: '200px',
                                                                radius: '50%',
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="card-body" >
                                                        <div style={{
                                                            float: 'right',
                                                        }}>
                                                            <label className="text-muted">service name</label>
                                                            <h4 className="card-title" >{service.name}</h4>
                                                            <label className="text-muted">service description</label>
                                                            <p className="card-text">{service.description}</p>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                        ))}
                    </div>
                </CardBody>
            </Card>


        </div >
    )
}

export default ServicesByUser


