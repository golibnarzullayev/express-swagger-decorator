import { Request, Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiMethod,
  ApiPath,
  ApiParams,
  ApiQueries,
  ApiResponse,
} from "express-swagger-decorator";

@ApiTags("Users")
export class UserController {
  @ApiMethod("get")
  @ApiPath("/users")
  @ApiQueries([
    { name: "page", description: "Page", required: true },
    { name: "limit", description: "Limit", required: true },
  ])
  @ApiOperation("Barcha foydalanuvchilarni olish")
  @ApiResponse(200, "OK", {
    type: "object",
    properties: {
      data: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string", required: true, example: "12312312" },
            name: { type: "string", required: true, example: "John" },
          },
        },
      },
      message: { type: "string", required: true },
    },
  })
  async getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: "John Doe" }]);
  }

  @ApiMethod("post")
  @ApiPath("/users")
  @ApiOperation("Yangi foydalanuvchi qo‘shish")
  @ApiBody({
    type: "object",
    properties: {
      name: { type: "string", required: true },
    },
  })
  async createUser(req: Request, res: Response) {
    const { name } = req.body;
    res.status(201).json({ id: Date.now(), name });
  }

  @ApiMethod("get")
  @ApiPath("/users/:id")
  @ApiParams([{ name: "id", description: "Foydalanuvchi IDsi" }])
  @ApiOperation("Bitta foydalanuvchini olish")
  @ApiResponse(200, "OK", {
    type: "object",
    properties: {
      data: {
        type: "object",
        properties: {
          id: { type: "string", required: true, example: "12312312" },
          name: { type: "string", required: true, example: "John" },
        },
      },
    },
  })
  async getUserById(req: Request, res: Response) {
    res.json({ id: req.params.id, name: "John Doe" });
  }
}
