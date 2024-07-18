import type { OptionalRecord } from '@echo/utils/types/optional-record'

export type WithQueryParamsType<
  Params extends Record<string, unknown>,
  QueryParams extends Record<string, unknown>
> = Params & OptionalRecord<'query', QueryParams>
