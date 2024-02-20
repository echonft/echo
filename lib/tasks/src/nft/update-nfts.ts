import { removeOrphanNfts } from '@echo/tasks/nft/remove-orphan-nfts'
import { updateUsersNfts } from '@echo/tasks/nft/update-users-nfts'
import type { LoggerInterface } from '@echo/tasks/types/logger-interface'
import dayjs from 'dayjs'

export async function updateNfts(logger?: LoggerInterface) {
  const start = dayjs()
  logger?.info(`Starting updating NFTs`)
  await updateUsersNfts(logger)
  await removeOrphanNfts(logger)
  const finish = dayjs()
  logger?.info(`Finished updating NFTs (took ${finish.diff(start, 's')} seconds)`)
}
