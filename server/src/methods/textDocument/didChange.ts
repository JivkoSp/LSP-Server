import { NotificationMessage } from "../../server";
import log from "../../log";

type DocumentUri = string;

interface TextDocumentIdentifier {
	uri: DocumentUri;
}

interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
    version: number;

};

interface TextDocumentContentChangeEvent {
    text: string;
};

interface DidChangeTextDocumentParams {
	textDocument: VersionedTextDocumentIdentifier;
	contentChanges: TextDocumentContentChangeEvent[];
}

export const didChange = (message: NotificationMessage): void => {
    log.write(message);
};