export type NonPromise<T> = T extends Promise<unknown> ? never : T
