export type Fetcher<TResponse, TArgs> = (args: TArgs) => Promise<TResponse>
