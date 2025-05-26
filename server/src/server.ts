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

let buffer = "";

process.stdin.on("data", (chunk) => {

  log.write(chunk);


  // buffer += chunk;
  // while(true) {
  //   // Check for the content length line
  //   const lengthMatch = buffer.match(/Content-Length: (\d+)\r\n/);

  //   // Check if the message is full
  //   if(!lengthMatch) {
  //      break; // Continue to add to the buffer
  //   }

  //   const contentLength = parseInt(lengthMatch[1], 10);
  //   const messageStart = buffer.indexOf("\r\n\r\n") + 4;

  //   // Continue unless the full message is in the buffer
  //   if(buffer.length < messageStart + contentLength) {
  //     break;
  //   }

  //   const rawMessage = buffer.slice(messageStart, messageStart + contentLength);
  //   const message = JSON.parse(rawMessage);

  //   log.write({id: message.id, method: message.method});

  //   // TODO: Call method and respond


  //   // Remove the processed message from the buffer
  //   buffer = buffer.slice(messageStart + contentLength);
  // } 
});