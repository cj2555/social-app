import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import UnreadMsg from './UnreadMsg';
import ReplyHistory from './ReplyHistory';

const MessageIndex = () => {
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                // activeKey={key}
                // onSelect={(k) => setKey(k)}
                className="mb-3"
                fill
            >
                <Tab eventKey="unread" title="Unread Message">
                    <UnreadMsg />
                </Tab>
                <Tab eventKey="sentmsg" title="Replyed Message">
                    <ReplyHistory/>
                </Tab>

            </Tabs>
        </div>
    )
}

export default MessageIndex
