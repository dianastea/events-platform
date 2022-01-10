import React, {useState} from "react";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button
} from "@material-ui/core";

const card = {
};

export default function Event(props) {

  return (
    <div>
      <Grid item key={props.event.name}>
        <Card style={card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Event Image"
              height="140"
              image={props.image}
              title="Event Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.event.name}
              </Typography>
              <Typography component="p">{props.group_name}</Typography>
              <Typography component="p">{props.event.description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              id={props.id + ',' + props.group_name}
              style={props.attending ? { display: "none" } : {}}
              onClick={(e) => {
                e.preventDefault(); 
                props.attendEvent(e);
              }}
            >
              Attend
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}
