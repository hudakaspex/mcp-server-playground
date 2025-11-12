#!/usr/bin/env node
import { server } from "./mcp-server.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main()
    .then(res => {
    console.error("MCP Server running on stdio");
})
    .catch(err => {
    console.error("Failed to running MCP Server on stdio");
    console.error(err);
});
