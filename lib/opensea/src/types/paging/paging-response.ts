import type { Key } from '@echo/utils/types/key-type'

export type PagingResponse<Response, K extends Key> = Record<K, Response[]> & { next?: string }
