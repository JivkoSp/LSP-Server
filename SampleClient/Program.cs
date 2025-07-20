using System.Diagnostics;
using StreamJsonRpc;
using Newtonsoft.Json.Linq;

public class Program
{
    public static async Task Main(string[] args)
    {
        var projectRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", ".."));
        var serverPath = Path.Combine(projectRoot, "server", "out", "server.js");
        var rootUri = new Uri(projectRoot).AbsoluteUri;

        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "node",
                Arguments = $"{serverPath} --stdio", // Add --stdio argument
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            }
        };

        // Asynchronously read from stderr
        process.ErrorDataReceived += (sender, e) => 
        {
            if (e.Data != null)
            {
                Console.WriteLine($"[SERVER_ERROR] {e.Data}");
            }
        };

        process.Start();
        process.BeginErrorReadLine(); // Begin reading stderr

        using (var jsonRpc = new JsonRpc(process.StandardInput.BaseStream, process.StandardOutput.BaseStream))
        {
            try
            {
                jsonRpc.StartListening();
                Console.WriteLine("JSON-RPC connection established.");

                // Send initialize request
                var initializeParams = new JObject
                {
                    ["processId"] = process.Id,
                    ["rootUri"] = rootUri,
                    ["capabilities"] = new JObject()
                };
                var initializeResult = await jsonRpc.InvokeWithParameterObjectAsync<JObject>("initialize", initializeParams);
                Console.WriteLine($"Initialize result: {initializeResult}");

                // Send textDocument/didOpen notification
                var didOpenParams = new JObject
                {
                    ["textDocument"] = new JObject
                    {
                        ["uri"] = "file:///c%3A/Users/ASUS/Desktop/test.cs",
                        ["languageId"] = "csharp",
                        ["version"] = 1,
                        ["text"] = "class Program { static void Main() { } }"
                    }
                };
                await jsonRpc.NotifyWithParameterObjectAsync("textDocument/didOpen", didOpenParams);
                Console.WriteLine("textDocument/didOpen notification sent.");

                // Send textDocument/completion request
                var completionParams = new JObject
                {
                    ["textDocument"] = new JObject
                    {
                        ["uri"] = "file:///c%3A/Users/ASUS/Desktop/test.cs"
                    },
                    ["position"] = new JObject
                    {
                        ["line"] = 0,
                        ["character"] = 0
                    }
                };
                var completionResult = await jsonRpc.InvokeWithParameterObjectAsync<JArray>("textDocument/completion", completionParams);
                Console.WriteLine($"Completion result: {completionResult}");

                // Keep the client running to maintain the connection
                Console.WriteLine("Connection is stable. Press Ctrl+C to exit.");
                await Task.Delay(-1); 
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An exception occurred: {ex}");
            }
        }
    }
}
