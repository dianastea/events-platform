import React from "react";
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
              <Typography component="p">{props.event.description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              id={props.id}
              style={props.attending ? { display: "none" } : {}}
              onClick={(e) => {
                e.preventDefault(); 
                props.attendEvent(e);
              }}
            >
              Attend
            </Button>
            {/* <Button
              size="small"
              color="primary"
              id={props.id}
            //   style={props.event.attending ? {} : { display: "none" }}
            //   onClick={(e) => {
            //     props.removeEvent(e);
            //   }}
            >
              Unregister
            </Button> */}
            {/* <Button size="small" color="primary" style={props.attending ? { display: "none" } : {}}>
              Volunteer
            </Button> */}
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}
