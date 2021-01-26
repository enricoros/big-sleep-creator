import React from "react";
import {
  Box,
  Button,
  CardActions,
  Container,
  FormControl,
  IconButton,
  InputLabel, makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import EditIcon from "@material-ui/icons/Edit";
import {operations} from "../logic/Operations";

// CSS for this component
const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroHyperParams: {
    padding: theme.spacing(1, 1.5),
  },
  heroHyperIcon: {
    marginRight: theme.spacing(2),
  },
}));

export function NewDreamConfig() {
  const classes = useStyles();

  // hyperparams configured
  const [dreamText, setDreamText] = React.useState<string>('');
  const [dreamReps, setDreamReps] = React.useState<number>(1);
  // UI state
  const [openHyper, setOpenHyper] = React.useState<boolean>(false);

  // server status, used to disable new commands if disconnected or busy
  const [ready, setReady] = React.useState<boolean>(false);
  React.useEffect(() => {
    const rsListener = v => setReady(v.ready);
    operations.serverReadiness.addSubscriber(rsListener);
    return () => operations.serverReadiness.removeSubscriber(rsListener);
  }, []);

  function nextDreams() {
    const text = dreamText.trim();
    if (ready && text.length > 2 && dreamReps >= 1 && dreamReps <= 100)
      operations.newDreams(text, dreamReps);
    else {
      // TODO: UI-warning
      console.log('Text too short:', text);
    }
  }

  return <div className={classes.heroContent}>
    <Container component="main" maxWidth="lg">
      {/* Title */}
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Let's dream along
      </Typography>

      {/* Input for New Dream */}
      <Box display="flex" flexDirection="row">
        {/* Text Input and HyperParams expansion box*/}
        <Box flexGrow={1}>
          <TextField id="newText" name="newText" label="Describe the image" placeholder="a puppy with blue eyes"
                     variant="outlined" fullWidth
                     value={dreamText} onChange={t => setDreamText(t.target.value)}
                     InputProps={{
                       endAdornment: (
                         <IconButton onClick={() => setOpenHyper(!openHyper)}>
                           {openHyper ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>}
                         </IconButton>
                       ),
                     }}
                     onKeyPress={ev => ev.key === 'Enter' && nextDreams()}>
          </TextField>
        </Box>

        {/* Select repetitions */}
        <FormControl variant="outlined" style={{minWidth: '100px'}}>
          <InputLabel id="next-gen-repeat-label">Repeat</InputLabel>
          <Select labelId="next-gen-repeat-label" label="Repeat"
                  value={dreamReps}
                  onChange={e => setDreamReps(parseInt(String(e.target.value || '1')))}>
            <MenuItem value={1}>x1</MenuItem>
            <MenuItem value={2}>x2</MenuItem>
            <MenuItem value={5}>x5</MenuItem>
            <MenuItem value={10}>x10</MenuItem>
            <MenuItem value={20}>x20</MenuItem>
            <MenuItem value={50}>x50</MenuItem>
            <MenuItem value={100}>x100</MenuItem>
          </Select>
        </FormControl>

        {/* Dream! */}
        <IconButton color="primary" size="medium" disabled={!ready} style={{paddingLeft: '24px', paddingRight: '24px'}}
                    onClick={() => nextDreams()}>
          {dreamReps > 1 ? 'Dreams' : 'Dream'}&nbsp;
          <PlayCircleFilledIcon fontSize="large" style={{color: !ready ? 'lightgray' : 'green'}}/>
        </IconButton>
      </Box>

      {/* Hyper parameters show/edit box */}
      {openHyper && <Paper elevation={6} className={classes.heroHyperParams}>
        <Box>
          {/*<Typography variant={"subtitle2"} color="textSecondary">*/}
          {/*  Hyper parameters for a new dream*/}
          {/*</Typography>*/}
          <Box style={{marginLeft: '1em'}}>
<pre>
  text = {JSON.stringify(dreamText, null, 2)}<br/>
  lr = 0.07<br/>
  ...<br/>
  repetitions = {dreamReps}
</pre>
          </Box>
        </Box>
        <CardActions>
          <Button size="small" color="primary" disabled={true}>
            <EditIcon fontSize={"small"} className={classes.heroHyperIcon}/>
            Edit hyper parameters
          </Button>
        </CardActions>
      </Paper>}

      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        This is a prototype{/* of human-in-the-loop art generation*/}.
      </Typography>
    </Container>
  </div>;
}