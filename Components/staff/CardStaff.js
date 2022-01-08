import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
import Image from "next/image"

export default function MediaCard({staffMember, classes}) {

  return (
    <Card sx={{ maxWidth: 500 }} align="center">
      <CardMedia>
        <div
          className={classes.fotoContainer}
          // component="img"
          // image={`http://localhost:8000/${staffMember.picture}`}
          // height="auto"
          // alt={staffMember.name}
        >
          <img
            src={`http://localhost:8000/${staffMember.picture}`}
            style={{ borderRadius: "50%" }}
            className={classes.foto}
          ></img>
        </div>
      </CardMedia>

      {/* <CardMedia>
        <Image
          className={classes.logo}
          src={`${staffMember.picture}`}
          alt="logo"
          width={500}
          height={400}
        ></Image>
      </CardMedia> */}
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
            <PhoneAndroidIcon></PhoneAndroidIcon> phone home:{" "}
          </span>
          {`${staffMember.phoneHome} `}
          <span style={{ fontWeight: 600 }} className={classes.spanes}>
            <LocalPhoneIcon></LocalPhoneIcon> phone personal:{" "}
          </span>
          {`${staffMember.phonePersonal}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{ fontWeight: 600 }} className={classes.spanes}>
            <PermIdentityIcon></PermIdentityIcon> RFC:
          </span>
          {` ${staffMember.rfc}  `}
          <span style={{ fontWeight: 600 }} className={classes.spanes}>
            <PermIdentityIcon></PermIdentityIcon> CURP:
          </span>
          {` ${staffMember.rfc}`}
        </Typography>
      </CardContent>
      <CardActions align="center">
        <div style={{ border: "" }}>
          <EditCustomizedDialogs
            staffMember={staffMember}
            classes={classes}
            id={staffMember._id}
          ></EditCustomizedDialogs>
          <NextLink href="/staff" passHref>
            <Link className={classes.tab}>
              <Button color="primary">
                <ArrowBackIcon></ArrowBackIcon> ATRAS
              </Button>
            </Link>
          </NextLink>
        </div>
      </CardActions>
    </Card>
  );
}