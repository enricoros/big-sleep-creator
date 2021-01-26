import React from "react";
import {ConnectionStatus, connector, ServerStatus} from "../logic/Connector";
import {AppBar, Box, CircularProgress, makeStyles, Toolbar, Tooltip, Typography} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import BrushIcon from "@material-ui/icons/Brush";
import {siteTitle} from "../brand";

// CSS for this component
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export function TopBar() {
  const classes = useStyles();
  const [cs, setCS] = React.useState<ConnectionStatus>(null);
  const [_ss, setSS] = React.useState<ServerStatus>(null);
  const [openEditor] = React.useState(false);

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
        statusElement = <React.Fragment>
          {ss.busy && <CircularProgress color="secondary" size="1.8rem" onClick={() => connector.sendForceClearBusy()}/>}
          <Typography variant="h5" color="inherit" style={{color: ss.busy ? 'darkred' : 'lightgreen', margin: '12px'}}>
            {ss.busy ? 'busy' : 'ready'}
          </Typography>
          <Tooltip title={<Typography variant="body2">
            Connected to {cs.host}:{cs.port}.<br/>
            <span style={{color: 'lightgray'}}>GPU</span>{ss.gpuNumber}:&nbsp;
            <span style={{color: 'lightgreen'}}>{ss.gpuName}</span>&nbsp;
            ({Math.round(ss.gpuTotal / 1048576) / 1024} GB)
          </Typography>}>
            <InfoOutlinedIcon style={{margin: '12px'}}/>
          </Tooltip>
          {/*<Tooltip title={<Typography variant="body2">Disconnect</Typography>}>*/}
          {/*  <ClearIcon style={{margin: '12px', cursor: 'pointer'}} onClick={() => connector.disconnect()}/>*/}
          {/*</Tooltip>*/}
        </React.Fragment>;
      } else {
        statusElement = <Box display="flex" flexDirection="row">
          <Typography variant="h6" noWrap>
            Disconnected&nbsp;
          </Typography>
          <Tooltip title={<Typography variant="body2">Disconnected from {cs.host}:{cs.port}</Typography>}>
            <WarningRoundedIcon fontSize="large"/>
          </Tooltip>
        </Box>;
      }
    } else {
      statusElement = <Box display="flex" flexDirection="row">
        <Typography variant="h6" noWrap>
          Connection <span style={{color: 'lightpink'}}>{cs.errorMessage}</span>&nbsp;
        </Typography>
        <Tooltip title={<Typography variant="body2">Issue connecting to {cs.host}:{cs.port}</Typography>}>
          <WarningRoundedIcon fontSize="large"/>
        </Tooltip>
      </Box>;
    }
  } else {
    statusElement = <Typography variant="h6">Initializing...</Typography>;
  }

  return <AppBar position="relative">
    <Toolbar>
      <BrushIcon className={classes.icon}/>
      <Typography variant="h6" color="inherit" noWrap>
        {siteTitle}
      </Typography>
      <Box flexGrow={1}/>
      <Box display="flex" flexDirection="row" alignItems="center" alignContent="middle">
        {!openEditor && statusElement}
        {openEditor && <React.Fragment>
          TODO: ADD BOX
        </React.Fragment>}
      </Box>
    </Toolbar>
  </AppBar>;
}