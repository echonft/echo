import { fetchAllNftsByAccount } from '@echo/nft-scan/fetchers/fetch-all-nfts-by-account'
import { getLogger } from '@echo/nft-scan/helpers/get-logger'
import {
  mapGetAllNftsByAccountResponse,
  type MapGetAllNftsByAccountResponseArgs,
  type MapGetAllNftsByAccountResponseReturn
} from '@echo/nft-scan/mappers/map-get-all-nfts-by-account-response'
import type { GetAllNftsByAccountRequest } from '@echo/nft-scan/types/request/get-all-nfts-by-account-request'
import { always, andThen, applySpec, assoc, pipe, prop } from 'ramda'

export function getAllNftsByAccount(args: GetAllNftsByAccountRequest): Promise<MapGetAllNftsByAccountResponseReturn[]> {
  const logger = getLogger({ chain: args.wallet.chain, fn: 'getAllNftsByAccount', logger: args.logger })
  return pipe(
    assoc('logger', logger),
    fetchAllNftsByAccount,
    andThen(
      pipe(
        applySpec<MapGetAllNftsByAccountResponseArgs>({
          chain: always(args.wallet.chain),
          data: prop('data'),
          logger: always(logger)
        }),
        mapGetAllNftsByAccountResponse
      )
    )
  )(args)
}
