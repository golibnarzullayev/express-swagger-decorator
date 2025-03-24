# Swagger Decorators for Express.js

This package provides a set of decorators to simplify API documentation generation in Express.js, similar to NestJS Swagger.

## Installation

```sh
npm install express-swagger-decorator
```

## Usage

### Setting up Swagger in Express

```ts
import express from "express";
import { SwaggerModule } from "express-swagger-decorator";
import { UserController } from "./controllers/user.controller";

const app = express();

SwaggerModule.setup(
  app,
  {
    title: "Example API",
    description: "This is an example API",
    version: "1.0.0",
    path: "/api-docs",
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
  Paths,
  ApiParams,
  ApiQueries,
} from "express-swagger-decorator";

@ApiTags("Users")
export class UserController {
  @ApiMethod("get")
  @Paths("/users")
  @ApiOperation("Get all users")
  async getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: "John Doe" }]);
  }

  @ApiMethod("post")
  @Paths("/users")
  @ApiOperation("Create a new user")
  @ApiBody({
    type: "object",
    properties: {
      name: { type: "string" },
    },
  })
  async createUser(req: Request, res: Response) {
    const { name } = req.body;
    res.status(201).json({ id: Date.now(), name });
  }

  @ApiMethod("get")
  @Paths("/users/:id")
  @ApiParams([{ name: "id", description: "User ID" }])
  @ApiOperation("Get a user by ID")
  async getUserById(req: Request, res: Response) {
    res.json({ id: req.params.id, name: "John Doe" });
  }
}
```

## Available Decorators

### `@ApiTags(name: string)`

Defines the tag for grouping endpoints.

### `@ApiMethod(method: "get" | "post" | "put" | "delete")`

Defines the HTTP method.

### `@Paths(path: string)`

Defines the endpoint path.

### `@ApiOperation(summary: string)`

Provides a short description of the endpoint.

### `@ApiBody(schema: object)`

Defines the request body schema.

### `@ApiParams(params: { name: string; description: string }[])`

Defines path parameters.

### `@ApiQueries(queries: { name: string; description: string; required?: boolean }[])`

Defines query parameters with an optional `required` flag.
