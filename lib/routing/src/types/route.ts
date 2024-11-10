export type RouteParams = Record<PropertyKey, string | string[]>

export type RouteParamsArgs<T> = T[] extends never[] ? T[] : [T]

export type RouteSearchParams = Record<string, string | string[] | number | boolean | undefined>

export type RouteQueryParams = Record<string, unknown>

export type RouteQueryParamsMapper<TQueryParams extends RouteQueryParams, TSearchParams extends RouteSearchParams> = (
  params: TQueryParams
) => TSearchParams
