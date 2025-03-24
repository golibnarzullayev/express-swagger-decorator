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
  @ApiQueries([
    { name: "page", description: "Page", required: true },
    { name: "limit", description: "Limit", required: true },
  ])
  @ApiOperation("Barcha foydalanuvchilarni olish")
  async getUsers(req: Request, res: Response) {
    res.json([{ id: 1, name: "John Doe" }]);
  }

  @ApiMethod("post")
  @Paths("/users")
  @ApiOperation("Yangi foydalanuvchi qo‘shish")
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
  @ApiParams([{ name: "id", description: "Foydalanuvchi IDsi" }])
  @ApiOperation("Bitta foydalanuvchini olish")
  async getUserById(req: Request, res: Response) {
    res.json({ id: req.params.id, name: "John Doe" });
  }
}
