import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const server = new McpServer({
  name: "mcp-playground",
  version: "1.0.0",
});
// https://jsonplaceholder.typicode.com/guide/
// https://modelcontextprotocol.io/specification/2025-06-18/server/tools

const publicApiUrl = 'https://jsonplaceholder.typicode.com';

server.registerTool(
  "GET_USER_LIST",
  {
    title: "Get User List",
    description: "Fetches a list of users from a Point of sale app."
  },
  async () => {
    const response = await fetch(`${publicApiUrl}/users`);
    const users = await response.json();
    return {
      content: [{ type: "text", text: JSON.stringify(users) }],
    };
  }
);

server.registerTool(
  "CREATE_NEW_USER",
  {
    title: 'Create new user',
    description: 'Create new user to user table, the required data is name',
    inputSchema: {
      name: z.string().describe('the user name'),
      email: z.string().describe('the user email and not required'),
      city: z.string()
    }
  },
  async (input) => {
    const createdUser = await fetch(`${publicApiUrl}/users`, {
      method: "POST",
      body: JSON.stringify(
        {
        name: input.name,
        email: input.email,
        city: input.city
      }
      ),
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
)
