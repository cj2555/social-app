import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import React, { useState, useEffect } from 'react'
import Card from 'components/Card/Card.js';
import MUIDataTable from 'mui-datatables';
import Api from 'util/Api';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
  import Storage from 'util/Storage';
import Button from '@material-ui/core/Button';

const UserMessage = ({useMessages}) => {

    const [unreadMsg, setunreadMsg] = useState([]);
    const [seletedMsgId, setselectedMsgID] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getUnreadMsg = async () => {

        let res = await Api.get('/replyHistory',
             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
        )
        if (res.data.success) {
            setunreadMsg(res.data.data)
        }

    }

    const handleRply = async (mId) => {
        await setselectedMsgID(mId)

        handleShow()


    }
    const options = {
        //no view colmun

        filter: false,
        print: false,
        download: false,
        selectableRows: 'none',
        responsive: 'scroll',
        viewColumns: false,
        footer: false,
        pagination: false,
        //standerd vertical scrolling enable
        //change row height
        rowHover: true,
    };

    const columns = [
        {
            name: "id",
            label: "ID",
        },
        {
            name: "user_message",
            label: "User Message",
        },
         {
            name: "admin_message",
            label: "Admin Message",
        },

        {
            name: "user",
            label: "User",
            options: {
                customBodyRender: (user, value) => {
                    return (
                        // <img src={`${ getImageBaseUrl() } / ${ value }`} style={{ width: '50px' }} / >
                        <div>
                            {user && (
                                <Link to={`/admin/userDetails/${user.id}`}> {user.name}</Link>
                            )}


                        </div>

                    )
                }
            }
        },
        {
            name: "id",
            label: "Action",
            options: {
                filter: false,
                customBodyRender: (data, tableMeta) => {
                    return (
                        <Button
                            onClick={() => {
                                handleRply(tableMeta.rowData[0])
                            }}
                        >Reply
                        </Button>




                    )
                }
            }
        }

    ]
    useEffect(() => {
        getUnreadMsg()
    }, [])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}
                    // margin left
                    style={{ justifyContent: 'center', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    <Card>

                        {/* <CardBody> */}
                        <MUIDataTable
                            data={useMessages}
                            columns={columns}
                            options={options}
                        />
                        {/* </CardBody> */}

                    </Card>

                </GridItem>
                {/* <ReplyToMsg
                    show={show}
                    msgId={seletedMsgId}
                    onHide={handleClose}
                    onAdded={() => getUnreadMsg()}
                /> */}
            </GridContainer>

        </div>
    )
}

const ActionDropdown = ({ mid, handleRply }) => {


    return (
        <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic">
                Action
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {/* <Link to={`/ admin / serviceById / ${ id } `}> */}
                <Dropdown.Item
                    onClick={() => {
                        handleRply()
                    }}
                >
                    View
                </Dropdown.Item>
                {/* // </Link> */}

                <Dropdown.Item
                // style={{ display: block_status ? 'none' : null }}
                // onClick={() => handleBlock(id)}
                >
                    delete
                    {/* unblock user {block_status} */}
                </Dropdown.Item>

            </Dropdown.Menu >



        </Dropdown >


    );
}

export default UserMessage
