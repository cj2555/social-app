import React, { useState, useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { bugs, website, server } from "variables/general.js";
import MUIDataTable from 'mui-datatables';
 import Storage from 'util/Storage';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Api from 'util/Api';

const useStyles = makeStyles(styles);

export default function Dashboard() {

  const [countData, setcountData] = useState({});
  const [onlineUser, setonlineUser] = useState([]);

  const getDashboardData = async () => {

    try {
      let response = await Api.get('/dashboardData',
        {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Storage.getToken()
                    }
                }
      );
      if (response.data.success) {
        setcountData(response.data.data.countData);
        setonlineUser(response.data.data.onlineUser);
      }

    } catch (err) {
      alert(err.message);
    }


  }
  const Options = {
    filterType: 'checkbox',
    print: false,
    download: false,
    selectableRows: 'none',


  };
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
      name: 'country',
      label: 'country',

    },
  ]
  useEffect(() => {
    getDashboardData();
  }, []);
  const classes = useStyles();
  return (
    <div>
      {countData && (
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <GroupIcon color="warning">
                  <Icon>content_copy</Icon>
                </GroupIcon>
                <p className={classes.cardCategory}>Total User</p>
                <h3 className={classes.cardTitle}>
                  {countData.userCount}
                </h3>
              </CardHeader>
              {/* <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    user list
                  </a>
                </div>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CategoryIcon  style={{
                  color: '#6f42f5',
                }}>
                  <Icon>content_copy</Icon>
                </CategoryIcon>
                <p className={classes.cardCategory}>Total Category</p>
                <h3 className={classes.cardTitle}>
                  {countData.categoryCount}
                </h3>
              </CardHeader>
              
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <PhoneAndroidIcon
                style={{
                  color: '#42c5f5',
                }}
                >
                  <Icon>content_copy</Icon>
                </PhoneAndroidIcon>
                <p className={classes.cardCategory}>Total Service</p>
                <h3 className={classes.cardTitle}>
                  {countData.serviceCount}
                </h3>
              </CardHeader>
              {/* <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Service list
                  </a>
                </div>
              </CardFooter> */}
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <LanguageIcon color="warning">
                  <Icon>content_copy</Icon>
                </LanguageIcon>
                <p className={classes.cardCategory}>Total Country</p>
                <h3 className={classes.cardTitle}>
                  {countData.countryCount}

                </h3>
              </CardHeader>
              
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader stats icon
                
              >
                <AccountCircleIcon
                style={{
                  color: '#b3f542',
                }}
                >
                  <Icon>content_copy</Icon>
                </AccountCircleIcon>
                <p className={classes.cardCategory}>Users Online</p>
                <h3 className={classes.cardTitle}>
                  {onlineUser.length}

                </h3>
              </CardHeader>
               
            </Card>
          </GridItem>
           <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader stats icon
                
              >
                <LocalAtmIcon
                  style={{
                    color: '#f542b3',
                }}
                >
                  <Icon>content_copy</Icon>
                </LocalAtmIcon>
                <p className={classes.cardCategory}>Profit from Calls</p>
                <h3 className={classes.cardTitle}>
                  {countData.profit}

                </h3>
              </CardHeader>
              
            </Card>
          </GridItem>

        </GridContainer>
      )}

      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Currently online User</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              {onlineUser && (
                <MUIDataTable

                  data={onlineUser}
                  columns={Columns}
                  options={Options}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>


      {/* <pre>
        {JSON.stringify(countData, null, 2)}
      </pre>
      <pre>
        {JSON.stringify(onlineUser, null, 2)}
      </pre> */}
    </div>
  );
}
