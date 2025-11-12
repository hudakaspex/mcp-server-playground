import { server } from "./mcp-server.js";
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
function main() {
    const transport = new StdioServerTransport();
    return server.connect(transport);
}
main()
    .then(res => {
    console.error("MCP Server running on stdio");
})
    .catch(err => {
    console.error("Failed to running MCP Server on stdio");
    console.error(err);
});
