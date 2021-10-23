import CardHeader from 'components/Card/CardHeader'
import React, { useEffect } from 'react'
import CardBody from 'components/Card/CardBody';
import MUIDataTable from 'mui-datatables';
import Card from 'components/Card/Card';
import { geUserList } from './Api/getUser';
import { Badge, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Api from "util/Api";
import getImageBaseUrl from "util/BaseUrl";
import Storage from 'util/Storage';
import { useHistory } from "react-router-dom";


const UserList = () => {
    const history = useHistory();

    const [rows, setRows] = React.useState([]);
    const goToUserDetails = (id) => {
        history.push(`/admin/userDetails/${id}`)
    }
    const getUser = async () => {
        let res = await geUserList()
        setRows(res)
    }

    const Columns = [
        {
            name: 'id',
            label: 'ID',
        },

        {
            name: 'name',
            label: 'Name',

        },
        {
            name: 'email',
            label: 'Email',
        },
        {
            name: 'register_type',
            label: 'Register Type',
        },
        {
            name: 'profile_pic',
            label: 'Profile Pic',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <img src={`${getImageBaseUrl()}/${value}`} alt="Profile Pic" style={{ width: '50px', height: '50px' }} />
                    )
                }
            }
        },
        {
            name: 'overall_rating',
            label: 'Rating',
        },
        {
            name: 'country',
            label: 'Country',
        },

        {
            name: 'block_status',
            label: 'Status',
            options: {
                customBodyRender: (block_status) => {
                    return (
                        //if the user is blocked then show the unblock button
                        block_status === 1 ?
                            //badge with blocked status
                            <Badge bg="danger">Blocked</Badge>
                            :
                            <Badge bg="success">Active</Badge>
                    )
                },
            }
        },
        {
            name: 'id',
            label: 'Action',

            options: {
                filter: false,

                customBodyRender: (data, tableMeta) => {
                    return (

                        < div >
                            <ActionDropdown
                                block_status={tableMeta.rowData[7]}
                                id={tableMeta.rowData[0]}
                            />
                        </ div >
                    )
                },
            }
        },

    ]



    const Options = {
        filterType: 'checkbox',
        print: false,
        download: false,
        selectableRows: 'none',


    };

    //block user
    const handleBlock = async (id) => {
        try {
            const response = await Api.get(`/handleBlock/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                });
            getUser();
        } catch (err) {
            alert(err.message);
        }


    }

    const ActionDropdown = ({ block_status, id }) => {
        return (
            <Dropdown>
                <Dropdown.Toggle variant="warning" id="dropdown-basic">
                    Action
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item
                        onClick={() => {
                            goToUserDetails(id)
                        }}
                    >
                        view
                    </Dropdown.Item>
                    <Dropdown.Item
                        style={{ display: block_status ? 'none' : null }}
                        onClick={() => handleBlock(id)}
                    >
                        block
                        {/* unblock user {block_status} */}
                    </Dropdown.Item>
                    <Dropdown.Item
                        style={{ display: block_status ? null : 'none' }}
                        onClick={() => handleBlock(id)}
                    >
                        unblock user
                    </Dropdown.Item>
                </Dropdown.Menu>



            </Dropdown>
        );
    }
    useEffect(() => {
        getUser()

    }, []);

    return (
        <div>
            <Card   >
                <CardHeader color="warning">
                    <h4 className="">User List</h4>

                </CardHeader>
                <CardBody>
                    <MUIDataTable

                        data={rows}
                        columns={Columns}
                        options={Options}
                    />
                </CardBody>
            </Card>
        </div>
    )
}

export default UserList
