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
import Image from "next/image";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";

export default function MediaCard({ staffMember, classes, atras }) {
  const [auth, guardarAuth] = useContext(AuthContext);
  console.log("auth desde card", auth.infoUser);

  let typeRol = {};
  if (auth.infoUser.rol === "Cliente") {
    typeRol.ruta = "clientModified";
    typeRol.titulo = "Cliente";
  } else if (auth.infoUser.rol === "Administrador") {
    typeRol.ruta = "staff";
    typeRol.titulo = "Administrador";
  }
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
            alt="staff"
            //src={`http://localhost:8000/${staffMember.picture}`}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}/${staffMember.picture}`}
            style={{ borderRadius: "50%", border: "2px solid #F8F8F8" }}
            className={classes.foto}
          />
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
            // id={staffMember._id}
            typeRol={typeRol}
          ></EditCustomizedDialogs>
          <NextLink href={atras} passHref>
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
