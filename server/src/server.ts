import log from "./log";
import { initialize } from "./methods/initialize";

interface Message {
	jsonrpc: string;
}

export interface RequestMessage extends Message {
	id: number | string;
	method: string;
	params?: unknown[] | object;
}

type RequestMethod = (message: RequestMessage) => object;

const methodLookup: Record<string, RequestMethod> = {
  initialize,
};

const respond = (id: RequestMessage['id'], result: object) => {
  
  const message = JSON.stringify({id, result});
  const messageLength = Buffer.byteLength(message, "utf-8");
  const header = `Content-Length: ${messageLength}\r\n\r\n`;

  log.write(header + message);
  process.stdout.write(header + message);


};

let buffer = "";

process.stdin.on("data", (chunk) => {
  
  buffer += chunk;

  while(true) {
    // Check for the content length line
    const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);

    // Check if the message is full
    if(!lengthMatch) {
       break; // Continue to add to the buffer
    }

    const contentLength = parseInt(lengthMatch[1], 10);

    const messageStart = buffer.indexOf("\r\n\r\n") + 4;

    // Continue unless the full message is in the buffer
    if(buffer.length < messageStart + contentLength) {
      break;
    }

    const rawMessage = buffer.slice(messageStart, messageStart + contentLength);

    const message = JSON.parse(rawMessage);

    log.write({id: message.id, method: message.method});

    const method = methodLookup[message.method];

    if(method) {
      respond(message.id, method(message));
    }

    // Remove the processed message from the buffer
    buffer = buffer.slice(messageStart + contentLength);
  } 
});