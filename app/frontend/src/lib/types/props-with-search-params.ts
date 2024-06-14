import type { WithSearchParamsProps } from '@echo/frontend/lib/types/with-search-params-props'

export type PropsWithSearchParams<T, U> = T & WithSearchParamsProps<U>
