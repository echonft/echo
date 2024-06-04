import { fetchAllNftsByAccount } from '@echo/nft-scan/fetchers/fetch-all-nfts-by-account'
import {
  mapGetAllNftsByAccountResponse,
  type MapGetAllNftsByAccountResponseArgs,
  type MapGetAllNftsByAccountResponseReturn
} from '@echo/nft-scan/mappers/map-get-all-nfts-by-account-response'
import type { GetAllNftsByAccountRequest } from '@echo/nft-scan/types/request/get-all-nfts-by-account-request'
import { always, andThen, applySpec, pipe, prop } from 'ramda'

export function getAllNftsByAccount(args: GetAllNftsByAccountRequest): Promise<MapGetAllNftsByAccountResponseReturn[]> {
  return pipe(
    fetchAllNftsByAccount,
    andThen(
      pipe(
        applySpec<MapGetAllNftsByAccountResponseArgs>({ chain: always(args.wallet.chain), data: prop('data') }),
        mapGetAllNftsByAccountResponse
      )
    )
  )(args)
}
