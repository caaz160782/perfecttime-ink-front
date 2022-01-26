import {
  Typography,
  Grid,
  Link,
  Card,
  Button,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import NextLink from "next/link";
import EditCustomizedDialogs from "./EditModalForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Detalle = ({ staffMember, reload, classes }) => {
  return (
    <div style={{ marginTop: "30px", marginBotton: "0px" }}>
      <NextLink href="/staff" passHref>
        <Link>
          <Button color="primary">
            {" "}
            <ArrowBackIcon /> IR ATRAS
          </Button>
        </Link>
      </NextLink>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {/* <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image> */}
          <img
            height="400"
            width={"400"}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${staffMember.picture}`}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography>
                {" "}
                <span style={{ fontWeight: 600 }}>Email:</span>{" "}
                {staffMember.email}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <span style={{ fontWeight: 600 }}>RFC:</span> {staffMember.rfc}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <span style={{ fontWeight: 600 }}>CURP:</span>{" "}
                {staffMember.curp}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <span style={{ fontWeight: 600 }}>Celular:</span>{" "}
                {staffMember.phonePersonal}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <span style={{ fontWeight: 600 }}>Telefono casa:</span>{" "}
                {staffMember.phoneHome}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography style={{ fontWeight: "600" }}>
                      Nombre:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{`${staffMember.name} `}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography style={{ fontWeight: "600" }}>
                      Apellidos:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{`${staffMember.lastName} `}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                {/* <Button
                  style={{ color: "#fff" }}
                  fullWidth
                  variant="contained"
                  color="secondary"
                >
                  EDITAR
                </Button> */}
                <EditCustomizedDialogs
                  staffMember={staffMember}
                  classes={classes}
                  reload={reload}
                ></EditCustomizedDialogs>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Detalle;
