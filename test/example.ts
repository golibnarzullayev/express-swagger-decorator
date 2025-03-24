import express from "express";
import { SwaggerModule } from "express-swagger-decorator";
import { UserController } from "./controller";

const app = express();
app.use(express.json());

const userController = new UserController();
app.get("/users", userController.getUsers.bind(userController));
app.post("/users", userController.createUser.bind(userController));
app.get("/users/:id", userController.getUserById.bind(userController));

SwaggerModule.setup(
  app,
  {
    title: "Example API",
    description: "This is an example API",
    version: "1.0.0",
  },
  [UserController]
);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/api-docs");
});
