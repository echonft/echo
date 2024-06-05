import type { Awaitable } from '@echo/utils/types/awaitable'

export interface Command {
  name: string
  execute: () => Awaitable<void>
}
