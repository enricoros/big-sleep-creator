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
import PauseIcon from '@material-ui/icons/Pause';
import ClearIcon from "@material-ui/icons/Clear";
import NightsStayIcon from '@material-ui/icons/NightsStay';

// CSS for these components
const useStyles = makeStyles((theme) => ({
  experimentsGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
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

function DreamCard({classes, idx, title, image}) {
  return <Card className={classes.experiment}>
    <CardMedia className={classes.experimentImage} image={image} title={title}>
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1}/>
        <IconButton size="small">
          <ClearIcon fontSize="large" style={{color: 'darkred'}}/>
        </IconButton>
        <Box style={{backgroundColor: '#0008'}}>
          {idx === 0 && <IconButton size="small">
            <AddCircleOutlineIcon fontSize="large" style={{color: 'lightgreen'}}/>
          </IconButton>}
          {idx === 1 && <IconButton size="small">
            <PauseIcon fontSize="large" style={{color: 'white'}}/>
          </IconButton>}
        </Box>
      </Box>
    </CardMedia>
    <CardContent className={classes.experimentContent}>
      <Typography gutterBottom variant="body2">
        Generated on {(new Date()).toLocaleString()}.
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" color="primary">View</Button>
      <Button size="small" color="primary">Save</Button>
      <Button size="small" color="primary">Hyper</Button>
      <Button size="small" color="primary">Latent</Button>
      <Button size="small" color="primary"><ClearIcon/></Button>
    </CardActions>
  </Card>;
}

interface DreamCardType {
  text: string,
  image: string,
}

const TEMP_DREAMS: DreamCardType[] = [
  {
    text: 'a puppy with blue eyes',
    image: 'https://user-images.githubusercontent.com/32999/105486415-48ede500-5c63-11eb-81ff-ce976abda2ef.png',
  },
  {
    text: 'a puppy with blue eyes',
    image: 'https://user-images.githubusercontent.com/32999/105486415-48ede500-5c63-11eb-81ff-ce976abda2ef.png',
  },
  {text: 'artificial intelligence', image: 'https://github.com/lucidrains/big-sleep/raw/main/samples/artificial_intelligence.png',},
  {text: 'stock photos', image: 'https://source.unsplash.com/random',},
  {text: 'stock photos', image: 'https://source.unsplash.com/random',},
  {text: 'stock photos', image: 'https://source.unsplash.com/random',},
  {text: 'stock photos', image: 'https://source.unsplash.com/random',},
  {text: 'stock photos', image: 'https://source.unsplash.com/random',},
];

export function Dreams() {
  const classes = useStyles();

  // @ts-ignore
  const dreamGroups = [...new Set(TEMP_DREAMS.map(d => d.text))];

  return <React.Fragment>
    <Container maxWidth="xl">
      <Typography variant={"h5"} component={"h5"} style={{paddingBottom: '1rem'}}>
        Dreams in progress
      </Typography>
    </Container>
    {dreamGroups.map((dreamGroupText, groupIdx) =>
      <Container key={`dream-group-${dreamGroupText}`} className={classes.experimentsGrid}
                 maxWidth="xl" style={{backgroundColor: (groupIdx % 2) === 0 ? 'aliceblue' : '#fafcff'}}>
        {/* Group Header */}
        <Box display="flex" flexDirection="row" alignItems="center">
          <NightsStayIcon color="primary"/>
          <Box flexGrow={1}>
            <Typography variant="body1">
              <span style={{color: '#3B88C3'}}>«</span> {dreamGroupText} <span style={{color: '#3B88C3'}}>»</span>
            </Typography>
          </Box>
          <Button color="primary" size="large" style={{paddingLeft: '1rem', paddingRight: '1rem'}}
                  onClick={() => console.log('Dreams.dreamMore()')}>
            Forget dreams&nbsp;
            <ClearIcon style={{color: 'darkred'}}/>
          </Button>
          <Button color="primary" size="large" style={{paddingLeft: '1rem', paddingRight: '1rem'}}
                  onClick={() => console.log('Dreams.dreamMore()')}>
            Dream more of this&nbsp;
            <AddCircleOutlineIcon style={{color: 'green'}}/>
          </Button>
        </Box>
        {/* Group Dreams */}
        <Grid container spacing={2}>
          {TEMP_DREAMS.filter(d => d.text === dreamGroupText).map((d, idx) =>
            <Grid key={`dream-${idx}`} item xs={12} sm={4} md={3} lg={2} xl={2}>
              <DreamCard classes={classes} idx={idx} title={d.text} image={d.image}/>
            </Grid>
          )}
        </Grid>
      </Container>
    )}
  </React.Fragment>;
}