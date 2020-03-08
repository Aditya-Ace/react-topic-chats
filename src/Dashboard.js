import React, { useState, useContext } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { ChatContext } from "./Store";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "3em",
    padding: theme.spacing(3, 2)
  },
  flex: {
    display: "flex",
    alignItems: "center"
  },
  topicsWindow: {
    width: "30%",
    height: "15em",
    borderRight: "1px solid grey"
  },
  chatWindow: {
    width: "70%",
    height: "15em",
    padding: "2em"
  },
  chatBox: {
    width: "85%"
  },
  button: {
    width: "15%"
  }
}));

const Dashboard = props => {
  const classes = useStyles();
  // Context Store
  const [getChats] = useContext(ChatContext);
  const topics = Object.keys(getChats);

  //Local State
  const [textValue, setTextValue] = useState("");
  const [activeTopic, setActiveTopic] = useState(topics[0]);
  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h3">React Chats</Typography>
      <Typography variant="subtitle1">
        Topic : {activeTopic[0].toUpperCase() + activeTopic.slice(1)}
      </Typography>
      <div className={classes.flex}>
        <div className={classes.topicsWindow}>
          <List>
            {topics.map(topic => {
              return (
                <ListItem
                  onClick={e => setActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              );
            })}
          </List>
        </div>
        <div className={classes.chatWindow}>
          {getChats[activeTopic].map((chat, i) => {
            return (
              <div key={i} className={classes.flex}>
                <Chip label={chat.from} />
                <Typography variant="subtitle1">{chat.msg}</Typography>
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.flex}>
        <TextField
          label="Send your message"
          className={classes.chatBox}
          value={textValue}
          onChange={e => setTextValue(e.target.value)}
        />
        <Button variant="contained" color="primary">
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default Dashboard;
