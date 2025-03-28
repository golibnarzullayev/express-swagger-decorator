# Swagger Decorators for Express.js

This package provides a set of decorators to simplify API documentation generation in Express.js, similar to NestJS Swagger.

## Installation

```sh
npm install express-swagger-doc-generator
```

## Usage

### Setting up Swagger in Express

```ts
import express from "express";
import { SwaggerModule } from "express-swagger-doc-generator";
import { UserController } from "./controllers/user.controller";

const app = express();

SwaggerModule.setup(
  app,
  {
    title: "Example API",
    description: "This is an example API",
    version: "1.0.0",
    path: "/api-docs",
    servers: [{ url: "https://your-server-url.uz", description: "Server url" }],
  },
  [UserController]
);

app.listen(3000, () => console.log("Server is running on port 3000"));
```

### Creating a Controller with Decorators

```ts
import { Request, Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiMethod,
  ApiPath,
  ApiParams,
  ApiQueries,
  ApiBasicAuth,
  ApiBearerAuth,
} from "express-swagger-doc-generator";

@ApiTags("Users")
export class UserController {
  @ApiMethod("get")
  @ApiPath("/users")
  @ApiOperation("Get all users")
  @ApiBasicAuth()
  @ApiResponse(200, "OK", {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", example: "12312312" },
            name: { type: "string", example: "John" },
          },
          required: ["id", "name"],
        },
      },
      message: { type: "string", required: true },
    },
    required: ["data", "message"],
  })
  async getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: "John Doe" }]);
  }

  @ApiMethod("post")
  @ApiPath("/users")
  @ApiOperation("Create a new user")
  @ApiBearerAuth()
  @ApiBody({
    type: "object",
    properties: {
      name: { type: "string", required: true },
    },
    required: ["name"],
  })
  @ApiResponse(201, "OK", {
    type: "object",
    properties: {
      message: { type: "string" },
    },
    required: ["message"],
  })
  async createUser(req: Request, res: Response) {
    const { name } = req.body;
    res.status(201).json({ id: Date.now(), name });
  }

  @ApiMethod("get")
  @ApiPath("/users/:id")
  @ApiParams([{ name: "id", description: "User ID" }])
  @ApiOperation("Get a user by ID")
  @ApiBearerAuth()
  @ApiResponse(200, "OK", {
    type: "object",
    properties: {
      data: {
        type: "object",
        properties: {
          id: { type: "string", example: "12312312" },
          name: { type: "string", example: "John" },
        },
        required: ["id", "name"],
      },
    },
    required: ["data"],
  })
  async getUserById(req: Request, res: Response) {
    res.json({ id: req.params.id, name: "John Doe" });
  }
}
```
