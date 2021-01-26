import React from "react";
import {ConnectionStatus, connector, ServerStatus} from "../logic/Connector";
import {
  AppBar,
  Box, Button,
  CircularProgress,
  Container,
  IconButton,
  Popover,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  makeStyles
} from "@material-ui/core";
import BrushIcon from "@material-ui/icons/Brush";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import SettingsIcon from '@material-ui/icons/Settings';
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";

import {siteTitle} from "../brand";

// CSS for this component
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export function TopBar() {
  const classes = useStyles();

  // UI status
  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);
  const [settingsAnchor, setSettingsAnchor] = React.useState(null);
  const [settingsHost, setSettingsHost] = React.useState('');
  const [settingsPort, setSettingsPort] = React.useState('');

  // get the Connection and Server statuses
  const [cs, setCS] = React.useState<ConnectionStatus>(null);
  const [_ss, setSS] = React.useState<ServerStatus>(null);
  React.useEffect(() => {
    const csListener = v => setCS({...v});
    const ssListener = v => setSS({...v});
    connector.connectionStatus.addSubscriber(csListener);
    connector.serverStatus.addSubscriber(ssListener);
    return () => {
      connector.connectionStatus.removeSubscriber(csListener);
      connector.serverStatus.removeSubscriber(ssListener);
    }
  }, []);

  // Status element (right messaging)
  let statusElement: JSX.Element;
  if (cs !== null) {
    if (!cs.errorMessage) {
      if (cs.connected) {
        const ss: ServerStatus = _ss || {} as ServerStatus;
        statusElement = <Box display="flex" flexDirection="row" alignItems="center">
          {ss.busy && <CircularProgress color="secondary" size="1.8rem" onClick={() => connector.sendForceClearBusy()}/>}
          <Typography variant="h6" style={{color: ss.busy ? 'darkred' : 'lightgreen', margin: '12px'}}>
            {ss.busy ? 'busy' : 'ready'}
          </Typography>
          <Tooltip title={
            <Typography variant="body2">
              Connected to <b>big-sleep</b> on {cs.host}:{cs.port}.<br/>
              <span style={{color: 'lightgray'}}>GPU</span>{ss.gpuNumber}:&nbsp;
              <span style={{color: 'lightgreen'}}>{ss.gpuName}</span>&nbsp;
              ({Math.round(ss.gpuTotal / 1048576) / 1024} GB)
            </Typography>}>
            <InfoOutlinedIcon fontSize="small"/>
          </Tooltip>
        </Box>;
      } else {
        statusElement = <Box display="flex" flexDirection="row" alignItems="center">
          <Typography variant="h6" noWrap>
            Disconnected&nbsp;
          </Typography>
          <Tooltip title={<Typography variant="body2">Disconnected from {cs.host}:{cs.port}</Typography>}>
            <WarningRoundedIcon/>
          </Tooltip>
        </Box>;
      }
    } else {
      statusElement = <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="h6" noWrap>
          Connection <span style={{color: 'lightpink'}}>{cs.errorMessage}</span>&nbsp;
        </Typography>
        <Tooltip title={<Typography variant="body2">Issue connecting to {cs.host}:{cs.port}</Typography>}>
          <WarningRoundedIcon/>
        </Tooltip>
      </Box>;
    }
  } else {
    statusElement = <Typography variant="h6">Initializing...</Typography>;
  }

  // Top bar full layout
  return (
    <AppBar position="relative">
      {/* Main application bar */}
      <Toolbar>
        <BrushIcon className={classes.icon}/>
        <Typography variant="h6" color="inherit" noWrap>
          {siteTitle}
        </Typography>
        <Box flexGrow={1}/>
        <Box display="flex" flexDirection="row" alignItems="center" alignContent="middle">
          {/* Status indicators */}
          {statusElement}

          {/* Settings Button */}
          <IconButton aria-describedby="settings-popover" style={{marginLeft: '1rem'}}
                      onClick={e => {
                        setSettingsAnchor(e.currentTarget);
                        setSettingsOpen(true);
                      }}>
            <SettingsIcon fontSize="large"/>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Settings Panel */}
      <Popover id="settings-popover" open={settingsOpen} anchorEl={settingsAnchor}
               onClose={() => setSettingsOpen(false)}
               anchorOrigin={{vertical: 'bottom', horizontal: 'center',}}
               transformOrigin={{vertical: 'top', horizontal: 'right',}}>
        <Container maxWidth="xs">
          {/* host/port for connection */}
          <Box m={1}>
            <Typography variant="h6" style={{marginBottom: '1em'}}>Connection</Typography>
            <Box display="flex" flexDirection="row" alignItems="center">
              <TextField label="Host" placeholder="localhost" fullWidth={true}
                         value={settingsHost} onChange={e => setSettingsHost(e.target.value)}/>
              <TextField label="Port" placeholder="5000" type="number"
                         value={settingsPort} onChange={e => setSettingsPort(e.target.value)}/>
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
              <Button size="large" color="primary" onClick={() => connector.disconnect()}>
                Disconnect
              </Button>
              <Button size="large" color="primary" disabled={settingsHost.length < 3 || settingsPort.length < 2}
                      onClick={() => connector.tryConnect(settingsHost, String(settingsPort))}>
                Connect
              </Button>
            </Box>
          </Box>
          {/* other settings */}
          <Box m={1}>
            <Typography variant="h6" style={{marginBottom: '1em'}}>Settings</Typography>
            <Box display="flex" flexDirection="row" alignItems="center">
              None yet
            </Box>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
              <Button color="primary" disabled={true}>
                Apply
              </Button>
            </Box>
          </Box>
        </Container>
      </Popover>
    </AppBar>
  );
}