import express, { Request, Response } from "express";
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { server } from "./mcp-server.js";

const app = express();
app.use(express.json());

app.post("/", async (req: Request, res: Response) => {
    // Create a new transport for each request to prevent request ID collisions
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true
    });

    res.on('close', () => {
        transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
