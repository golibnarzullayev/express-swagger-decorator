export type SchemaType =
  | {
      type: "string";
      example?: string;
      format?: string;
      enum?: string[];
      required?: string[];
    }
  | { type: "number"; example?: number; required?: string[] }
  | { type: "boolean"; example?: boolean; required?: string[] }
  | { type: "array"; items: SchemaType; required?: string[] }
  | {
      type: "object";
      properties: Record<string, SchemaType>;
      required?: string[];
    };
