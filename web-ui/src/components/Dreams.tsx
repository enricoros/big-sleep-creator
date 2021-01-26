import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import ClearIcon from "@material-ui/icons/Clear";

// CSS for these components
const useStyles = makeStyles((theme) => ({
  experimentsGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(8),
    // boxShadow: '0px 8px 20px -9px #0000009c',
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
}));

// TEMP - HACK
export const ImageURLs = [
  'https://source.unsplash.com/random',
  'https://user-images.githubusercontent.com/32999/105486415-48ede500-5c63-11eb-81ff-ce976abda2ef.png',
  'https://github.com/lucidrains/big-sleep/raw/main/samples/artificial_intelligence.png',
]

let imageIdx = 0;

function DreamCard(props) {
  const idx = imageIdx++ % ImageURLs.length;
  const imageUrl = ImageURLs[idx];
  const imageTitle = 'test1';
  return <Card className={props.classes.experiment}>
    <CardMedia className={props.classes.experimentImage} image={imageUrl} title={imageTitle}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}/>
        <Box style={{backgroundColor: '#000A'}}>
          {idx === 2 && <IconButton size="medium">
            <PlayCircleFilledIcon fontSize="large" style={{color: 'lightgreen'}}/>
          </IconButton>}
          {idx === 1 && <IconButton size="medium">
            <PauseCircleFilledIcon fontSize="large" color="secondary"/>
          </IconButton>}
          {idx === 1 && <IconButton size="medium" disabled={true}>
            {/*<StopIcon fontSize="large" color="error"/>*/}
            <ClearIcon fontSize="large" style={{color: 'lightpink'}}/>
          </IconButton>}
        </Box>
      </Box>
    </CardMedia>
    <CardContent className={props.classes.experimentContent}>
      <Typography gutterBottom variant="body1">
        Generated on {(new Date()).toLocaleString()}.
      </Typography>
    </CardContent>
    <CardActions>
      <Box display="flex" flexDirection="row">
        <Button size="small" color="primary">View</Button>
        <Button size="small" color="primary">Save</Button>
        <Button size="small" color="primary">Hyper</Button>
        <Button size="small" color="primary">Latent</Button>
      </Box>
    </CardActions>
  </Card>;
}

export function Dreams() {
  const classes = useStyles();
  return <React.Fragment>
    <Container maxWidth="xl">
      <Typography variant={"h5"} component={"h5"} style={{paddingBottom: '1rem'}}>
        Dreams in progress
      </Typography>
    </Container>
    <Container className={classes.experimentsGrid} maxWidth="xl" style={{backgroundColor: 'aliceblue'}}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box flexGrow={1} >
          <Typography variant="h6">
            « a puppy with blue eyes »
          </Typography>
        </Box>
        <Button size="large" style={{paddingLeft: '24px', paddingRight: '24px'}}
                onClick={() => console.log('Dreams.dreamMore()')}>
          Dream more of this&nbsp;
          <AddCircleOutlineIcon style={{color: 'green'}}/>
        </Button>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DreamCard classes={classes}/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <DreamCard classes={classes}/>
        </Grid>
      </Grid>
    </Container>
  </React.Fragment>;
}