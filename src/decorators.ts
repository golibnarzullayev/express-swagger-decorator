import "reflect-metadata";

export const ApiTags = (...tags: string[]): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata("api:tags", tags, target);
  };
};

export const ApiOperation = (summary: string): MethodDecorator => {
  return (target, propertyKey, descriptor) => {
    Reflect.defineMetadata("api:operation", { summary }, target, propertyKey);
  };
};

export const ApiResponse = (
  status: number,
  description: string
): MethodDecorator => {
  return (target, propertyKey) => {
    const responses =
      Reflect.getMetadata("api:responses", target, propertyKey) || [];
    responses.push({ status, description });
    Reflect.defineMetadata("api:responses", responses, target, propertyKey);
  };
};

export const ApiBody = (schema: any): MethodDecorator => {
  return (target, propertyKey) => {
    Reflect.defineMetadata("api:body", schema, target, propertyKey);
  };
};

export const ApiMethod = (
  method: "get" | "post" | "put" | "delete" | "patch"
): MethodDecorator => {
  return (target, propertyKey) => {
    Reflect.defineMetadata("api:method", method, target, propertyKey);
  };
};

export const Paths = (path: string): MethodDecorator => {
  return (target, propertyKey) => {
    Reflect.defineMetadata("api:path", path, target, propertyKey);
  };
};

export const ApiParams = (
  params: { name: string; description: string; required?: boolean }[]
): MethodDecorator => {
  return (target, propertyKey) => {
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
): MethodDecorator => {
  return (target, propertyKey) => {
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
