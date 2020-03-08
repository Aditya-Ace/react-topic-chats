import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Store from "./Store";
import Dashboard from "./Dashboard";

const useStyles = makeStyles(theme => ({
  app: {
    textAlign: "center"
  }
}));
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
};

export default App;
