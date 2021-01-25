import React from "react";
import {
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Typography
} from "@material-ui/core";
import BrushIcon from '@material-ui/icons/Brush';
import {siteTitle} from "./brand";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  experimentsGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  experimentImage: {
    paddingTop: '56.25%', // 16:9
  },
  experiment: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  experimentContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const topBar = props =>
  <AppBar position="relative">
  <Toolbar>
    <BrushIcon className={props.classes.icon}/>
    <Typography variant="h6" color="inherit" noWrap>
      {siteTitle}
    </Typography>
  </Toolbar>
</AppBar>;

function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <topBar classes={classes}/>
      <main>
        {/* Title */}
        <div className={classes.heroContent}>
          <Container component="main" maxWidth="lg">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {siteTitle}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This is a work in progress.
            </Typography>
          </Container>
        </div>

        {/* Output */}
        <Container className={classes.experimentsGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item key={'1'} xs={12} sm={6} md={4}>
              <Card className={classes.experiment}>
                <CardMedia
                  className={classes.experimentImage}
                  image="https://source.unsplash.com/random"
                  title="Test1"
                />
                <CardContent className={classes.experimentContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Heading
                  </Typography>
                  <Typography>
                    This is a media card. You can use this section to describe the content.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">View</Button>
                  <Button size="small" color="primary">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>

      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          This is a footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Tell me the purpose of this footer
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    </React.Fragment>
  );
}

export default App;

