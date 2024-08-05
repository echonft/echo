export type Strict<T, Shape> = T extends Shape
  ? keyof T extends keyof Shape
    ? Exclude<keyof T, keyof Shape> extends never
      ? T
      : never
    : never
  : never
