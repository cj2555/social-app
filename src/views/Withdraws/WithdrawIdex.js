import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import WithDrawPendingList from 'views/Withdraws/WithDrawPendingList';
import ApprovedWithDrawList from 'views/Withdraws/ApprovedWithDrawList';

const WithdrawIdex = () => {
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                // activeKey={key}
                // onSelect={(k) => setKey(k)}
                className="mb-3"
                fill
            >
                <Tab eventKey="unread" title="Pending Withdraw">
                    <WithDrawPendingList />
                </Tab>
                <Tab eventKey="sentmsg" title="Withdraw Approved">
                    <ApprovedWithDrawList/>
                </Tab>

            </Tabs>
        </div>
    )
}

export default WithdrawIdex
