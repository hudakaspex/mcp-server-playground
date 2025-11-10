import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const server = new McpServer({
  name: "mcp-playground",
  version: "1.0.0",
});
// https://modelcontextprotocol.io/specification/2025-06-18/server/tools
server.registerTool(
  "simple-calculation",
  {
    title: "Calculate Sum",
    description: "Calculates the sum of two numbers.",
    inputSchema: {
      num1: z.number(),
      num2: z.number(),
    },
  },
  async ({ num1, num2 }) => {
    const output = { result: num1 + num2 };
    return {
      content: [{ type: "text", text: JSON.stringify(output) }],
    };
  }
);
