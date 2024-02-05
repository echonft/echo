import type { Nullable } from '@echo/utils/types/nullable'
import type { ReactNode } from 'react'

export type NextLayoutParams<P = unknown> = P & { children?: Nullable<ReactNode> }
