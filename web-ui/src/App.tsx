import React from "react";

import {Dreams} from "./components/Dreams";
import {Footer} from "./components/Footer";
import {NewDreamConfig} from "./components/NewDreamConfig";
import {TopBar} from "./components/TopBar";

/*function ServerMessageQueue(props) {
  const [open, setOpen] = React.useState(true);
  const list = [
    'Server Connected',
    'Dream',
  ]
  return <Snackbar
    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
    open={open}
    autoHideDuration={6000}
    onClose={() => setOpen(false)}
    children={
      <Box>
        {list.map((name, idx) =>
          <SnackbarContent key={'snack-' + idx} message={name}/>
        )}
      </Box>
    }
  />
}*/

export function App() {
  return (
    <React.Fragment>
      <TopBar/>
      {/*<ServerMessageQueue/>*/}
      <main>
        <NewDreamConfig/>
        <Dreams/>
      </main>
      <Footer/>
    </React.Fragment>
  );
}
