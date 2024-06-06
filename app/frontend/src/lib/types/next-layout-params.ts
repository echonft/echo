import type { Nullable } from '@echo/utils/types/nullable'
import type { OptionalRecord } from '@echo/utils/types/optional-record'
import type { ReactNode } from 'react'

export type NextLayoutParams<P = unknown> = P & OptionalRecord<'children', Nullable<ReactNode>>
