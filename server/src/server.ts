import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    InitializeParams,
    CompletionItem,
    TextDocumentSyncKind,
    InitializeResult
} from 'vscode-languageserver/node';

import {
    TextDocument
} from 'vscode-languageserver-textdocument';

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params: InitializeParams) => {
    const result: InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            // Tell the client that the server supports code completion.
            completionProvider: {
                resolveProvider: false
            }
        }
    };
    return result;
});

connection.onCompletion(
    (_textDocumentPosition): CompletionItem[] => {
        // The pass parameter contains the position of the text document in
        // which code complete got requested. For the example we ignore this
        // info and always provide the same completion items.
        return [
            { label: 'abstract' }, { label: 'as' }, { label: 'base' },
            { label: 'bool' }, { label: 'break' }, { label: 'byte' },
            { label: 'case' }, { label: 'catch' }, { label: 'char' },
            { label: 'checked' }, { label: 'class' }, { label: 'const' },
            { label: 'continue' }, { label: 'decimal' }, { label: 'default' },
            { label: 'delegate' }, { label: 'do' }, { label: 'double' },
            { label: 'else' }, { label: 'enum' }, { label: 'event' },
            { label: 'explicit' }, { label: 'extern' }, { label: 'false' },
            { label: 'finally' }, { label: 'fixed' }, { label: 'float' },
            { label: 'for' }, { label: 'foreach' }, { label: 'goto' },
            { label: 'if' }, { label: 'implicit' }, { label: 'in' },
            { label: 'int' }, { label: 'interface' }, { label: 'internal' },
            { label: 'is' }, { label: 'lock' }, { label: 'long' },
            { label: 'namespace' }, { label: 'new' }, { label: 'null' },
            { label: 'object' }, { label: 'operator' }, { label: 'out' },
            { label: 'override' }, { label: 'params' }, { label: 'private' },
            { label: 'protected' }, { label: 'public' }, { label: 'readonly' },
            { label: 'ref' }, { label: 'return' }, { label: 'sbyte' },
            { label: 'sealed' }, { label: 'short' }, { label: 'sizeof' },
            { label: 'stackalloc' }, { label: 'static' }, { label: 'string' },
            { label: 'struct' }, { label: 'switch' }, { label: 'this' },
            { label: 'throw' }, { label: 'true' }, { label: 'try' },
            { label: 'typeof' }, { label: 'uint' }, { label: 'ulong' },
            { label: 'unchecked' }, { label: 'unsafe' }, { label: 'ushort' },
            { label: 'using' }, { label: 'virtual' }, { label: 'void' },
            { label: 'volatile' }, { label: 'while' }, { label: 'add' },
            { label: 'alias' }, { label: 'ascending' }, { label: 'async' },
            { label: 'await' }, { label: 'by' }, { label: 'descending' },
            { label: 'dynamic' }, { label: 'equals' }, { label: 'from' },
            { label: 'get' }, { label: 'global' }, { label: 'group' },
            { label: 'into' }, { label: 'join' }, { label: 'let' },
            { label: 'nameof' }, { label: 'notnull' }, { label: 'on' },
            { label: 'orderby' }, { label: 'partial' }, { label: 'remove' },
            { label: 'select' }, { label: 'set' }, { label: 'unmanaged' },
            { label: 'value' }, { label: 'var' }, { label: 'when' },
            { label: 'where' }, { label: 'yield' }
        ];
    }
);

// Make the text document manager listen on the connection
// for open, change and close text document events.
documents.listen(connection);

// Listen on the connection
connection.listen();