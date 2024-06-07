import type { Awaitable } from '@echo/utils/types/awaitable'
import type { ReactElement } from 'react'

export type NextReturn = Awaitable<void> | ReactElement | Promise<ReactElement> | null
