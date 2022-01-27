import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import EditCustomizedDialogs from "./EditModalForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Image from "next/image";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

export default function MediaCard({ staffMember, classes, atras, reload }) {
  const { auth, guardarAuth } = useContext(AuthContext);
  return (
    <Card sx={{ maxWidth: 500 }} align="center">
      <CardMedia
        component="img"
        alt="foto"
        height="auto"
        image={`${process.env.NEXT_PUBLIC_BASE_URL}${staffMember.picture}`}
      />
      <CardActionArea>
        <CardContent align="center">
          <Typography gutterBottom variant="h5" component="div">
            {`${staffMember.name} ${staffMember.lastName} `}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: 600 }} className={classes.spanes}>
              <MailOutlineIcon></MailOutlineIcon> Email:
            </span>{" "}
            {`${staffMember.email} `}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: 600 }} className={classes.spanes}>
              <PhoneAndroidIcon></PhoneAndroidIcon> phone personal:{" "}
            </span>
            {`${staffMember.phonePersonal}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: 600 }} className={classes.spanes}>
              <PermIdentityIcon></PermIdentityIcon> Age:
            </span>
            {` ${staffMember.age}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <NextLink href={atras} passHref>
          <Link className={classes.tab}>
            <Button color="primary">
              <ArrowBackIcon></ArrowBackIcon> ATRAS
            </Button>
          </Link>
        </NextLink>
        <EditCustomizedDialogs
          staffMember={staffMember}
          classes={classes}
          reload={reload}
        ></EditCustomizedDialogs>
      </CardActions>
    </Card>
  );
}
