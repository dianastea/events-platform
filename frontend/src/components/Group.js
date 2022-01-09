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

export default function Group(props) {

  return (
    <div>
      <Grid item key={props.group.name}>
        <Card style={card}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Group Image"
              height="140"
              image={props.image}
              title="Group Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.group.name}
              </Typography>
              <Typography component="p">{props.group.description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              name={props.name}
              user_id={props.id}
              key={props.key}
              style={props.joined ? { display: "none" } : {}}
              onClick={(e) => {
                e.preventDefault(); 
                props.join(e);
              }}
            >
              Join
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}