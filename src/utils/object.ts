type Stringifiable = string | number | boolean | null | undefined;

// Provides a method with typed keys for Object.keys
export function objectKeys<O extends object>(object: O) {
  return Object.keys(object) as Array<`${keyof O & Stringifiable}`>;
}

export function clone<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}
