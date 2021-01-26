import {makeStyles, Typography} from "@material-ui/core";
import React from "react";

// CSS for this component
const useStyles = makeStyles((theme) => ({
  footer: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export function Footer() {
  const classes = useStyles();
  return <footer className={classes.footer}>
    <Typography variant="h6" align="center" gutterBottom>
      This is a footer
    </Typography>
    <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
      Tell me the purpose of this footer
    </Typography>
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  </footer>;
}
