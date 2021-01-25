import React from "react";
import {
  AppBar, Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia, CircularProgress,
  Container,
  Grid, Icon, IconButton,
  makeStyles, Paper, TextField,
  Toolbar,
  Typography
} from "@material-ui/core";

import BrushIcon from '@material-ui/icons/Brush';
import EditIcon from '@material-ui/icons/Edit';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';

import {siteTitle} from "./brand";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroHyperParams: {
    padding: theme.spacing(1, 1.5),
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


function TopBar(props) {
  // TODO: subscribe to overall status
  const [connected, setConnected] = React.useState(true);
  const [busy, setBusy] = React.useState(false);
  return <AppBar position="relative">
    <Toolbar>
      <BrushIcon className={props.classes.icon}/>
      <Typography variant="h6" color="inherit" noWrap>
        {siteTitle}
      </Typography>
      <Box flexGrow={1}/>
      <Box display="flex" flexDirection="row" alignItems="center" alignContent="middle">
        <Typography variant="h6" color="inherit" noWrap onClick={() => {
          setBusy(!busy);
          setConnected(!connected);
        }}>
          Status: {connected ? <>connected, {busy ? <b style={{color: 'lightpink'}}>busy</b> : <span style={{color: 'lightgreen'}}>ready</span>}</>
          : <b style={{color: 'darkred'}}>disconnected</b>}
        </Typography>
        {busy && <CircularProgress color="secondary" size="2rem" style={{marginLeft: '1em'}}/>}
      </Box>
    </Toolbar>
  </AppBar>;
}

function NewInput(props) {
  const [showHyper, setShowHyper] = React.useState<boolean>(false);

  const [nextText, setNextText] = React.useState<string>('');

  function pressedEnter() {
    console.log('DO IT!');
  }

  return <div className={props.classes.heroContent}>
    <Container component="main" maxWidth="lg">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Let's dream along
      </Typography>

      <Box display="flex" flexDirection="column">
        {/* Input field, with related actions*/}
        <Box display="flex" flexDirection="row">
          <TextField id="newText" name="newText" label="Describe the image" placeholder="a puppy with blue eyes"
                     variant="outlined" margin="normal" fullWidth value={nextText} onChange={t => setNextText(t.target.value)}
                     onKeyPress={ev => {
                       if (ev.key === 'Enter') {
                         ev.preventDefault();
                         pressedEnter();
                       }
                     }}>
          </TextField>
          <IconButton size="medium" onClick={() => setShowHyper(!showHyper)}>
            {showHyper ? <ExpandLessIcon fontSize="large"/> : <ExpandMoreIcon fontSize="large"/>}
          </IconButton>
          <IconButton size="medium">
            <PlayArrowIcon fontSize="large"/>
          </IconButton>
        </Box>
        {/* Hyper parameters show/edit box */}
        {showHyper &&
        <Paper className={props.classes.heroHyperParams}>
          <Box>
            <Typography variant={"subtitle2"} color="textSecondary">
              Hyper parameters for a new generation
            </Typography>
            <Box fontFamily="monospace" style={{marginLeft: '1em'}}>
              <Typography>
                text={JSON.stringify(nextText, null, 2)}
              </Typography>
            </Box>
          </Box>
          <CardActions>
            <Button size="small" color="primary" disabled={true}>
              <EditIcon fontSize={"small"} className={props.classes.icon}/>
              Edit
            </Button>
          </CardActions>
        </Paper>}
      </Box>

      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        This is a work in progress.
      </Typography>
    </Container>
  </div>;
}

function ExperimentCard(props) {
  const imageUrl = 'https://source.unsplash.com/random';
  const imageTitle = 'test1';
  return <Card className={props.classes.experiment}>
    <CardMedia className={props.classes.experimentImage} image={imageUrl} title={imageTitle}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}/>
        <Box style={{backgroundColor: '#000A'}}>
          <IconButton size="medium">
            <PlayCircleFilledIcon fontSize="large" color="primary"/>
          </IconButton>
          <IconButton size="medium">
            <PauseCircleFilledIcon fontSize="large" color="secondary"/>
          </IconButton>
          <IconButton size="medium" disabled={true}>
            <StopIcon fontSize="large" color="error"/>
          </IconButton>
        </Box>
      </Box>
    </CardMedia>
    <CardContent className={props.classes.experimentContent}>
      <Typography gutterBottom variant="body1">
        Generated on {(new Date()).toLocaleString()}.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">View</Button>
      <Button size="small" color="primary">Save</Button>
      <Button size="small" color="primary">Edit</Button>
    </CardActions>
  </Card>;
}

function Experiments(props) {
  return <Container className={props.classes.experimentsGrid} maxWidth="md">
    <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={4}>
        <ExperimentCard classes={props.classes}/>
      </Grid>
    </Grid>
  </Container>;
}

function Footer(props) {
  return <footer className={props.classes.footer}>
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

export function App() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <TopBar classes={classes}/>
      <main>
        <NewInput classes={classes}/>
        <Experiments classes={classes}/>
      </main>
      <Footer classes={classes}/>
    </React.Fragment>
  );
}
