import type { Awaitable } from '@echo/utils/types/awaitable'
import type { Nullable } from '@echo/utils/types/nullable'
import type { ReactElement } from 'react'

export type NextReturn = Awaitable<void> | Awaitable<ReactElement> | Nullable
