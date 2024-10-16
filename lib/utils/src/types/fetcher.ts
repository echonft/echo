export type Fetcher<TResponse, TArgs = never> = (...args: TArgs[]) => Promise<TResponse>
