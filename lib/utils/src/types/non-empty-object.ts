export type NonEmptyObject<T extends Record<PropertyKey, unknown>> = Record<PropertyKey, never> extends T ? never : T
