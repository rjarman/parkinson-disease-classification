import { links } from './Config';
import { ParsedData } from './types';

export class SocketEvents {
  private webSocket: WebSocket;

  constructor(private dataParser: (parsedData: ParsedData) => void) {
    this.webSocket = new WebSocket(links.socket.soc);

    this.receiveMessage();
  }

  private receiveMessage() {
    this.webSocket.onmessage = (event) => {
      const parsedData: ParsedData = JSON.parse(event.data);
      this.dataParser(parsedData);
    };
  }

  checkServer(data: { type: string; data: number }) {
    this.webSocket.onopen = () => {
      this.webSocket.send(JSON.stringify(data));
    };
  }

  sendToServer(data: { type: string; data: string }) {
    this.webSocket.send(JSON.stringify(data));
  }

  disconnect(
    data: ParsedData = { status: true, type: 'close', value: 'close socket' }
  ) {
    this.webSocket.send(JSON.stringify(data));
    this.webSocket.close();
  }
}
