import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import SalesReport from './SalesReport';
import TransactionList from './TransactionList';
import WithDrawPendingList from './WithDrawPendingList';


const PaymentIndex = () => {


    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                // activeKey={key}
                // onSelect={(k) => setKey(k)}
                className="mb-3"
                fill
            >
                <Tab eventKey="transaction" title="Transactions">
                    <TransactionList />
                </Tab>
                <Tab eventKey="slae" title="Sale Report">
                    <SalesReport />
                </Tab>
                {/* <Tab eventKey="pay" title="Make Payment" >
                    <WithDrawPendingList />
                </Tab> */}
            </Tabs>
        </div>
    )

}

export default PaymentIndex
