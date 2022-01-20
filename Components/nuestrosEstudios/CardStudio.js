import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function CardStudio({ study }) {
  return (
    <Grid align="center" item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="estudio logo"
          />
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {study.name}
            </Typography>
            <Typography variant="p" color="text.secondary">
              <q>{study.description}</q>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`${study.city}, ${study.state}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button color="success" size="small">
            Unirme
          </Button>
          <Button color="success" size="small">
            CONOCER
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
