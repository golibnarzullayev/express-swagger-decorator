import "reflect-metadata";
import { SchemaType } from "./type";

export const ApiTags = (...tags: string[]) => {
  return (target: Object): void => {
    Reflect.defineMetadata("api:tags", tags, target);
  };
};

export const ApiPath = (path: string) => {
  return (target: Object, propertyKey: any): void => {
    Reflect.defineMetadata("api:path", path, target, propertyKey);
  };
};

export const ApiMethod = (method: string) => {
  return (target: Object, propertyKey: any): void => {
    Reflect.defineMetadata("api:method", method, target, propertyKey);
  };
};

export const ApiOperation = (summary: string) => {
  return (target: Object, propertyKey: any): void => {
    Reflect.defineMetadata("api:operation", { summary }, target, propertyKey);
  };
};

export const ApiResponse = (
  status: number,
  description: string,
  schema?: SchemaType
) => {
  return (target: Object, propertyKey: any): void => {
    const responses =
      Reflect.getMetadata("api:responses", target, propertyKey) || [];
    responses.push({
      status,
      description,
      schema: schema,
    });
    Reflect.defineMetadata("api:responses", responses, target, propertyKey);
  };
};

export const ApiBody = (schema: SchemaType) => {
  return (target: Object, propertyKey: any) => {
    Reflect.defineMetadata("api:body", schema, target, propertyKey);
  };
};

export const ApiParams = (
  params: { name: string; description: string; required?: boolean }[]
) => {
  return (target: Object, propertyKey: any) => {
    const existingParams =
      Reflect.getMetadata("api:params", target, propertyKey) || [];
    Reflect.defineMetadata(
      "api:params",
      [...existingParams, ...params],
      target,
      propertyKey
    );
  };
};

export const ApiQueries = (
  queries: { name: string; description: string; required?: boolean }[]
) => {
  return (target: Object, propertyKey: any) => {
    const existingQueries =
      Reflect.getMetadata("api:queries", target, propertyKey) || [];
    Reflect.defineMetadata(
      "api:queries",
      [...existingQueries, ...queries.map((q) => ({ required: false, ...q }))],
      target,
      propertyKey
    );
  };
};
