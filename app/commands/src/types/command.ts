import type { Awaitable } from '@echo/utils/types/awaitable'

export type CommandName =
  | 'add-collection-guild'
  | 'clear-db'
  | 'fetch-collection'
  | 'fetch-nft'
  | 'fetch-nfts'
  | 'update-collection'
  | 'update-nft'
  | 'update-user-nfts'
  | 'update-users-nfts'
  | 'update-wallet-nfts'

export interface Command {
  name: CommandName
  execute: () => Awaitable<void>
}
