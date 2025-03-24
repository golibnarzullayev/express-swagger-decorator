import swaggerUi from "swagger-ui-express";
import express, { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";

import "reflect-metadata";

export interface SwaggerOptions {
  title: string;
  description: string;
  version: string;
  path?: string;
}

export class SwaggerModule {
  static setup(app: Application, options: SwaggerOptions, controllers: any[]) {
    const paths: any = {};

    controllers.forEach((controller) => {
      const instance = new controller();
      const controllerTags = Reflect.getMetadata("api:tags", controller);

      Object.getOwnPropertyNames(controller.prototype).forEach((method) => {
        const httpMethod =
          Reflect.getMetadata("api:method", instance, method) || "get";
        const operation = Reflect.getMetadata(
          "api:operation",
          instance,
          method
        );
        const responses =
          Reflect.getMetadata("api:responses", instance, method) || [];
        const body = Reflect.getMetadata("api:body", instance, method);
        const params =
          Reflect.getMetadata("api:params", instance, method) || [];
        const queries =
          Reflect.getMetadata("api:queries", instance, method) || [];
        const path = Reflect.getMetadata("api:path", instance, method);
        const methodTags =
          Reflect.getMetadata("api:tags", instance, method) || [];

        if (!path) return;

        if (!paths[path]) {
          paths[path] = {};
        }

        paths[path][httpMethod] = {
          operationId: method,
          summary: operation?.summary,
          tags: [...new Set([...methodTags, ...controllerTags])]
            .flat()
            .map((tag) =>
              typeof tag === "string" ? tag.replace(/\[|\]|"/g, "").trim() : tag
            ),
          responses: responses.reduce((acc: any, res: any) => {
            acc[res.status] = {
              description: res.description,
              content: {
                "application/json": {
                  schema: res.schema || {},
                },
              },
            };
            return acc;
          }, {}),
          parameters: [
            ...params.map((p: any) => ({
              in: "path",
              name: p.name,
              description: p.description,
              required: true,
            })),
            ...queries.map((q: any) => ({
              in: "query",
              name: q.name,
              description: q.description,
              required: q.required ?? false,
            })),
          ],
          requestBody: body
            ? { content: { "application/json": { schema: body } } }
            : undefined,
        };
      });
    });

    const swaggerDefinition = {
      openapi: "3.0.0",
      info: {
        title: options.title,
        description: options.description,
        version: options.version,
      },
      paths,
    };

    const swaggerDocs = swaggerJSDoc({
      definition: swaggerDefinition,
      apis: [],
    });

    const swaggerUiPath = require
      .resolve("swagger-ui-dist")
      .replace(/swagger-ui-dist.*/, "swagger-ui-dist");

    fs.writeFileSync("swagger.json", JSON.stringify(swaggerDocs));

    app.use(
      options.path || "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs, {
        swaggerOptions: {
          url: options.path || "/api-docs" + "/swagger.json",
        },
      })
    );

    app.use("/api-docs", (req, res, next) => {
      const filePath = path.join(swaggerUiPath, req.path);
      const mimeType = mime.lookup(filePath) || "application/javascript";
      res.setHeader("Content-Type", mimeType);
      express.static(swaggerUiPath)(req, res, next);
    });

    app.get(`${options.path || "/api-docs"}/swagger.json`, (req, res) =>
      res.json(swaggerDocs)
    );
  }
}
