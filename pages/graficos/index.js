import clienteAxios from "../../utils/axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  CardContent,
  CardActions,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import Layout from "../../Components/Layout";
import { AuthContext } from "../../Context/AuthContext";
import { makeStyles } from "@mui/styles";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const DashBoard = () => {
  const router = useRouter();
  const useStyles = makeStyles((theme) => {});
  const classes = useStyles();
  const loading = false;
  const { auth } = useContext(AuthContext);

  const [citas, setCitas] = useState([]);
  const cargaDates = async () => {
    try {
      clienteAxios
        .get(`/dateTatooByStudio/${auth.infoStudio.id}`, {
          headers: { apitoken: auth.token },
        })
        .then((response) => {
          setCitas(response.data.payload.dates);
          if (response.data.code) {
            setEven(response.data.payload.dates);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          } else {
            console.log(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    cargaDates();
  }, []);

  console.log("citas", citas);
  return (
    <Grid container spacing={1}>
      <Grid item md={2} xs={12}>
        <Card className={classes.section}>
          <List>
            <NextLink classes href="/graficos" passHref>
              <ListItem selected button component="a">
                <ListItemText primary="Admin Dashboard"></ListItemText>
              </ListItem>
            </NextLink>
            <NextLink href="/agenda" passHref>
              <ListItem button component="a">
                <ListItemText primary="Agenda"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
        </Card>
      </Grid>
      <Grid item md={9} xs={12}>
        {/* <Card className={classes.section}> */}
        <Card className={classes.section}>
          <List>
            <ListItem>
              {loading ? (
                <CircularProgress />
              ) : (
                <Grid container spacing={5}>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h2">
                          120
                          {/* ${summary.ordersPrice} */}
                        </Typography>
                        <Typography>Sales</Typography>
                      </CardContent>
                      <CardActions>
                        {/* <NextLink href="/admin/orders" passHref> */}
                        <NextLink href="/" passHref>
                          <Button size="small" color="primary">
                            View sales
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h1">
                          {/* {summary.ordersCount} */}
                          12
                        </Typography>
                        <Typography>Orders</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/" passHref>
                          {/* <NextLink href="/admin/orders" passHref> */}
                          <Button size="small" color="primary">
                            View orders
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h1">
                          {/* {summary.productsCount} */}
                          76
                        </Typography>
                        <Typography>Products</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/" passHref>
                          <Button size="small" color="primary">
                            View products
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid item md={3}>
                    <Card raised>
                      <CardContent>
                        <Typography variant="h1">
                          {/* {summary.usersCount} */}
                          27
                        </Typography>
                        <Typography>Users</Typography>
                      </CardContent>
                      <CardActions>
                        <NextLink href="/admin/users" passHref>
                          <Button size="small" color="primary">
                            View users
                          </Button>
                        </NextLink>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              )}
            </ListItem>
            <ListItem>
              <Typography component="h1" variant="h1">
                Sales Chart
              </Typography>
            </ListItem>
            <ListItem>
              <Bar
                data={{
                  labels: citas.map((x) => x.id_tatuador.name),
                  // labels: [
                  //   "January",
                  //   "February",
                  //   "March",
                  //   "April",
                  //   "May",
                  //   "June",
                  //   "July",
                  // ],
                  datasets: [
                    {
                      label: "Sales",
                      backgroundColor: "rgba(162, 222, 208, 1)",
                      // data: citas.map((x) => x.totalSales),
                      data: [65, 59, 80, 81, 56, 55, 40],
                    },
                  ],
                }}
                options={{
                  legend: { display: true, position: "right" },
                }}
              ></Bar>
            </ListItem>
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};
export default DashBoard;
//099
