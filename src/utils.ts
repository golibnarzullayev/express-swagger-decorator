import { SchemaType } from "./type";

export const extractRequiredFields = (schema: SchemaType): string[] => {
  if (schema.type === "object" && schema.properties) {
    return Object.keys(schema.properties).filter(
      (key) => schema.properties[key].required !== undefined
    );
  }

  if (schema.required !== undefined) {
    return ["_self"];
  }

  return [];
};
