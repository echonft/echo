import { getUsersPaginated } from '@echo/firestore/crud/user/get-users-paginated'
import { PROMISE_POOL_CONCURRENCY } from '@echo/tasks/constants/promise-pool-concurrency'
import { updateUserNfts } from '@echo/tasks/nft/update-user-nfts'
import type { LoggerInterface } from '@echo/utils/types/logger-interface'
import { PromisePool } from '@supercharge/promise-pool'
import { inc } from 'ramda'

async function updateUsersNftsForPage(page: number, logger?: LoggerInterface) {
  const { result: users, hasNext } = await getUsersPaginated({ page })
  await PromisePool.withConcurrency(PROMISE_POOL_CONCURRENCY)
    .for(users)
    .process(async (user) => {
      await updateUserNfts(user, logger)
    })
  if (hasNext) {
    return await updateUsersNftsForPage(inc(page), logger)
  }
  return
}

export function updateUsersNfts(logger?: LoggerInterface) {
  return updateUsersNftsForPage(0, logger)
}
