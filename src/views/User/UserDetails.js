import React, { useEffect, useState } from 'react'
import { Card, Nav, Tab } from 'react-bootstrap'
//imprt userDetails css
import './userDetails.css'
import Tabs from 'react-bootstrap/Tabs'
import ServicesByUser from 'views/Service/ServicesByUser'
import Api from 'util/Api'
import Storage from 'util/Storage';
import UsersTransactions from './UsersTransactions'
import UserMessage from './UserMessage'




const UserDetails = ({ match }) => {
    const userId = match.params.id
    const [userDetails, setuserDetails] = useState({});


    const getUserDetails = async () => {
        const response = await Api.get(`/usersDetails/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Storage.getToken()

            }

        })

        if (response.data.success) {
            console.log(response.data.data);

            setuserDetails(response.data.data);
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <div>
            <div>
                <Card className="text-center"

                >

                    <Card.Body>
                        <img src="https://picsum.photos/200" alt="user" className="card-img-top rounded-circle"
                            style={{
                                'border': '4px solid #e9ecef',
                            }} />
                        <div className="card-body">

                            <Card.Title>{userDetails.name}</Card.Title>
                            {/* <Card.Text>
                                {userDetails.bio}
                            </Card.Text> */}
                        </div>

                        <div style={{ "display": "flex", "justify-content": "center", "padding": "10px" }}>
                            <div style={{ "margin-right": "60px" }}>
                                <Card
                                     

                                    text={'light'}
                                    style={{
                                        height: '8rem',
                                        width: '15rem',
                                        //rounded edge
                                        borderRadius: '0.8rem',
                                        opacity: '0.9',
                                        //gradient bakcgorund
                                        background: 'linear-gradient(to right, #2193b0, #6dd5ed)',

                                    }}
                                    className=""
                                >

                                    <div style={{ "display": "block", "justify-content": "center" }}>
                                        <h5 style={{ "margin-top": "20px" }}>
                                            <b>{userDetails.name}</b>
                                        </h5>
                                        <p>
                                            user name
                                        </p>

                                    </div>


                                </Card>
                            </div>
                            <div style={{ "margin-right": "60px" }}>
                                <Card
                                     

                                    text={'light'}
                                    style={{
                                        height: '8rem',
                                        width: '15rem',
                                        borderRadius: '0.8rem',
                                        opacity: '0.9',
                                         background: "#db062f",


                                    }}
                                    className=""
                                >
                                    <div style={{ "display": "block", "justify-content": "center" }}>
                                        <h5 style={{ "margin-top": "20px" }}>

                                            <b>{userDetails.register_type}</b>

                                        </h5>
                                        <p>register type</p>

                                    </div>
                                </Card>
                            </div>
                            <div style={{ "margin-right": "60px" }}>
                                <Card
                                   

                                    text={'light'}
                                    style={{
                                        height: '8rem',
                                        width: '15rem',
                                        borderRadius: '0.8rem',
                                        opacity: '0.9',
                                        background: "#32ae05",




                                    }}
                                    className="mb-2"
                                >
                                    <div style={{ "display": "block", "justify-content": "center" }}>
                                        <h5 style={{ "margin-top": "20px" }}>
                                            <b>{
                                                userDetails.block_status ? "Blocked" : "Not Blocked"
                                            }</b>

                                        </h5>
                                        <p>Block Status</p>


                                    </div>
                                </Card>
                            </div>
                          

                            {/* <div>
                                <Card
                                    bg="dark"

                                    text={'light'}
                                    style={{
                                        height: '8rem',
                                        width: '15rem',
                                        borderRadius: '0.8rem',
                                        opacity: '0.9',



                                    }}
                                    className="mb-2"
                                >
                                    <div style={{ "display": "block", "justify-content": "center" }}>
                                        <h5 style={{ "margin-top": "20px" }}>
                                            <b>4.5</b>

                                        </h5>
                                        <p>rating</p>

                                    </div>
                                </Card>
                            </div> */}


                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div className="nav-container">
                <Tabs
                    defaultActiveKey="Transaction"
                    transition={true}
                    id="noanim-tab-example"
                    className="tabs"
                    variant="tabs"
                    fill="true"
                    style={{
                        "background": "white",
                        "font-size": "20px"
                    }}
                >
                    <Tab eventKey="home" title="Activity List" className="tab">
                        coming soon
                    </Tab>
                    <Tab eventKey="Transaction" title="Transaction" className="tab">
                        
                   {userDetails &&  <UsersTransactions transactions={userDetails.transactions} />}
                    </Tab>
                    <Tab eventKey="contact" title="Messages" className="tab">
                        <UserMessage useMessages={ userDetails.user_admin_msg}/>
                    </Tab>
                    <Tab eventKey="services" title="Service List" className="tab" >
                        {userDetails && <ServicesByUser services={userDetails.services} />}
                    </Tab>
                </Tabs>

            </div>


            {/* <div className="bottom-card">
                <Card className="text-center">

                    <Card.Body>

                    </Card.Body>
                </Card>
            </div> */}
        </div >
    )
}


export default UserDetails
