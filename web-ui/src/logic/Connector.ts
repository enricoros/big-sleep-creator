import {io as ioClient, Socket} from 'socket.io-client';
import {Subscribable} from "./Subscribable";

// default connection to port 5000 of the server hosting the page
const DEFAULT_HOST = window.location.hostname || '127.0.0.1';
const DEFAULT_PORT = '5000';

const DEBUG_CONNECTION = true;
const log = DEBUG_CONNECTION ? console.log : () => null;
const err = console.error;

// managed by the client
export interface ConnectionStatus {
  connected: boolean,
  errorMessage: null | string,
  host: string,
  port: string,
}

// received from the server (keep in SYNC)
export interface ServerStatus {
  busy: boolean,
  clientsCount: number,
  gpuNumber: number,
  gpuName: string,
  gpuTotal: number,
}

// shared definitions
export interface DreamHyperParams {
  text: string,

}


class Connector {
  private socket?: Socket = null;
  public connectionStatus = new Subscribable<ConnectionStatus>({
    connected: false,
    errorMessage: null,
    host: 'not set',
    port: 'not set',
  });
  public serverStatus = new Subscribable<ServerStatus>({
    busy: true,
    clientsCount: 0,
    gpuNumber: 0,
    gpuName: '',
    gpuTotal: 0,
  });

  constructor() {
    this.tryConnect(DEFAULT_HOST, DEFAULT_PORT);
  }

  /**
   * Warning: not verified calling this multiple times - should work tho
   */
  tryConnect(host: string, port: string) {
    this.disconnect();
    this.connectionStatus.partialUpdate({connected: false, host: host, port: port});

    // perform a new connection
    const serverURI = `${host}:${port}`
    if (DEBUG_CONNECTION) log(`Connector: connecting to: ${serverURI}`);
    this.socket = ioClient(serverURI, {

      transports: ['websocket']
    });

    // basic connection/disconnection events
    this.socket.on('connect', () => {
      if (DEBUG_CONNECTION) log(`Connector: server connected (${this.socket.id})`);
      this.connectionStatus.partialUpdate({connected: true, errorMessage: null});
    });
    this.socket.on('connect_error', error => {
      if (DEBUG_CONNECTION) log(`Connector: server connection error`);
      this.connectionStatus.partialUpdate({connected: false, errorMessage: (error || 'unknown').toString()});
    });
    this.socket.on('disconnect', () => {
      if (DEBUG_CONNECTION) log(`Connector: server disconnected`);
      this.connectionStatus.partialUpdate({connected: false, errorMessage: null});
    });
    if (DEBUG_CONNECTION)
      this.socket.onAny((name, param1) => console.log(`Connector: '${name}'`, param1));

    // specific event handlers
    this.socket.on('@status:server', v => this.serverStatus.partialUpdate(v));
  }

  sendNewDream(config: DreamHyperParams): void {
    if (!this.socket.connected) return err(`Connector.sendNewDream: disconnected`);
    this.socket.emit('@dream:new', config);
  }

  disconnect() {
    if (this.socket)
      this.socket.disconnect();
  }

  sendForceClearBusy() {
    err('Connector.sendForceClearBusy: You should NEVER use this method');
    this.socket.emit('@admin:clear_busy');
  }
}

export const connector = new Connector();