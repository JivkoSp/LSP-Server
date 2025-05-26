import { RequestMessage } from "../server";

type ServerCapabilities = Record<string, unknown>;

interface InitializeResult {
	capabilities: ServerCapabilities;
	serverInfo?: {
		name: string;
		version?: string;
	};
}

export const initialize = (message: RequestMessage):
        InitializeResult => {
            
            let capabilities = {
                
            };
            
            let serverInfo = {
                name: "LSP SERVER",
                version: "0.0.1"
            };

            return {
                capabilities: capabilities,
                serverInfo: serverInfo
            };
        };