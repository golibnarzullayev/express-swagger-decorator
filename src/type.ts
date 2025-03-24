export type SchemaType =
  | {
      type: "string";
      example?: string;
      format?: string;
      enum?: string[];
      required?: boolean;
    }
  | { type: "number"; example?: number; required?: boolean }
  | { type: "boolean"; example?: boolean; required?: boolean }
  | { type: "array"; items: SchemaType; required?: boolean }
  | {
      type: "object";
      properties: Record<string, SchemaType>;
      required?: boolean;
    };
