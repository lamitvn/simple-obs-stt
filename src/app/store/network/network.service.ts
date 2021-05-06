import {Injectable}                from '@angular/core';
import {NetworkMode, NetworkStore} from './network.store';
import Peer                        from "peerjs";
import {NetworkQuery}              from "@store/network/network.query";
import {ConnectionState}           from "../../utils/types";
import {Subject}                   from "rxjs";
import {v4 as uuid}                from 'uuid';

interface Message {
  type: string,
  data: any
}

@Injectable({providedIn: 'root'})
export class NetworkService {
  constructor(private networkStore: NetworkStore, private networkQuery: NetworkQuery) {}

  public messages$          = new Subject<Message>();
  public onClientConnected$ = new Subject();

  private peerInstance?: Peer;
  public getPeerId            = () => this.peerInstance?.id;
  private connInstance?: Peer.DataConnection; // client connection
  private UpdateNetworkStatus = (peerConnectionState: ConnectionState) => this.networkStore.update({peerConnectionState})

  public SendMessage(message: Message) {
    if (this.peerInstance?.disconnected)
      return;
    for (let hash in this.peerInstance?.connections)
      for (let peerConnection of this.peerInstance?.connections[hash])
        peerConnection.send(message);
  }

  private ResetClient(hostId: string) {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    this.connInstance?.close();
    this.connInstance = undefined;
    this.peerInstance?.destroy();
    this.peerInstance = undefined;
    setTimeout(() => {
      console.log("[Client] Reset")
      this.InitClient(hostId);
    }, 4000);
  }

  Stop() {
    this.UpdateNetworkStatus(ConnectionState.Disconnected);
    !this.peerInstance?.destroyed && this.peerInstance?.destroy();
  }

  private StartPeer(id: string): Peer {
    const mode = this.networkStore.getValue().networkMode;


    return new Peer(id, mode === NetworkMode.localhost ? {
      host: 'localhost',
      path: 'ws',
      secure: false,
      port: 3030
    } : undefined)
  }

  public SetClientNetworkMode(isLocal = false) {
    this.networkStore.update({networkMode: isLocal ? NetworkMode.localhost : NetworkMode.network});
  }

  public InitClient(hostId: string) {
    this.UpdateNetworkStatus(ConnectionState.Connecting);
    this.peerInstance = this.StartPeer(uuid());
    this.peerInstance?.on("open", _id => {
      this.connInstance = this.peerInstance?.connect(hostId, {reliable: true});
      this.connInstance?.on("open", () => {
        this.connInstance?.on("data", data => this.messages$.next(data));
        this.UpdateNetworkStatus(ConnectionState.Connected);
      });
      this.connInstance?.on("close", () => this.ResetClient(hostId));
      this.connInstance?.on("error", error => {
        console.log(error);
        // this.ResetClient(hostId);
      });
    });
    this.peerInstance.on("disconnected", () => {})
    this.peerInstance.on("error", error => {
      this.ResetClient(hostId);
    });
  }

  public async StartHost() {

    this.UpdateNetworkStatus(ConnectionState.Connecting);
    const state = this.networkQuery.getValue();
    const hostID = state.saveHost ? (state.hostID || uuid()) : uuid(); // reuse or create new id

    this.peerInstance = this.StartPeer(hostID);
    try {
      await new Promise((res, rej) => {
        this.peerInstance?.on("open", res);
        this.peerInstance?.on("error", rej);
      });
      this.UpdateNetworkStatus(ConnectionState.Connected)
    } catch (error) {
      this.UpdateNetworkStatus(ConnectionState.Disconnected)
      throw new Error(error.message);
    }
    this.networkStore.update({hostID: this.peerInstance?.id});
    this.peerInstance?.on("connection", _peerConnection => {
      _peerConnection.on("open", () => this.onClientConnected$.next())
    })
  }

  SwitchSaveHost() {
    this.networkStore.update(e => ({saveHost: !e.saveHost}))
  }
}