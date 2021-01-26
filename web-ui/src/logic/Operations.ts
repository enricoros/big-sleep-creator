import {ConnectionStatus, connector, ServerStatus} from "./Connector";
import {Subscribable} from "./Subscribable";

const warn = console.warn;

class Operations {
  // cache the latest readiness status
  private isConnected = false;
  private isServerBusy = true;

  // create a compound status based on (isConnected && !isServerBusy)
  public serverReadiness = new Subscribable({
    ready: false,
  });

  constructor() {
    connector.connectionStatus.addSubscriber((v: ConnectionStatus) => this.setIsConnected(v.connected));
    connector.serverStatus.addSubscriber((v: ServerStatus) => this.setIsBusy(v.busy));
  }

  isReady = () => this.isConnected && !this.isServerBusy;

  newDreams(dreamText: string, dreamReps: number) {
    if (!this.isReady()) return warn(`Operations: newDreams while !ready`);
    // preemptively enter the busy state to not accept further commands until the server is free
    // this.setIsBusy(true);
    // send the command now
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
    connector.sendNewDream({
      text: dreamText,
    });
  }

  private setIsConnected(value) {
    if (this.isConnected === value) return;
    this.isConnected = value;
    this.serverReadiness.partialUpdate({ready: this.isReady()})
  }

  private setIsBusy(value) {
    if (this.isServerBusy === value) return;
    this.isServerBusy = value;
    this.serverReadiness.partialUpdate({ready: this.isReady()})
  }
}

export const operations = new Operations();
