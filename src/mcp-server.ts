import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const server = new McpServer({
  name: "mcp-playground",
  version: "1.0.0",
});
// https://modelcontextprotocol.io/specification/2025-06-18/server/tools

const publicApiUrl = 'https://api.restful-api.dev/objects';

server.registerTool(
  "GET_DEVICE_LIST",
  {
    title: "Get Device List",
    description: "Get all device"
  },
  async () => {
    const response = await fetch(publicApiUrl);
    const users = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(users) }],
    };
  }
);

server.registerTool(
  "ADD_NEW_DEVICE",
  {
    title: 'Add New Device',
    description: "Added new device data to the list",
    inputSchema: {
      name: z.string(),
      data: z.object({
        year: z.number().optional(),
        price: z.number().optional(),
        "CPU Model": z.string().optional(),
        "Hard disk size": z.string().optional(),
        generation: z.string().optional()
      })
    }
  },
  async (input) => {
    const createdUser = await fetch(publicApiUrl, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res = createdUser.json();
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(res)
        }
      ]
    }
  }
);
