import type { Wallet } from '@echo/model/types/wallet'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import { getAllNftsByAccountResponseSchema } from '@echo/nft-scan/validators/get-all-nfts-by-account-response-schema'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { always, applySpec, identity, map, pipe, prop, propEq, reject, toLower } from 'ramda'

type ResponseData = ReturnType<typeof getAllNftsByAccountResponseSchema.parse>['data']

export interface MapGetAllNftsByAccountResponseArgs {
  data: ResponseData
  chain: ChainName
}

export interface MapGetAllNftsByAccountResponseReturn {
  contract: Wallet
  nfts: ReturnType<typeof mapNftResponse>[]
}

export function mapGetAllNftsByAccountResponse(
  args: MapGetAllNftsByAccountResponseArgs
): MapGetAllNftsByAccountResponseReturn[] {
  const { chain, data } = args
  try {
    return pipe<[ResponseData], ResponseData, MapGetAllNftsByAccountResponseReturn[]>(
      reject(propEq(true, 'is_spam')),
      map(
        applySpec({
          contract: {
            address: pipe(prop('contract_address'), toLower),
            chain: always(chain)
          },
          nfts: pipe(
            prop('assets'),
            map(
              pipe(
                applySpec<MapNftResponseArgs>({
                  response: identity,
                  chain: always(chain)
                }),
                mapNftResponse
              )
            )
          )
        })
      )
    )(data)
  } catch (err) {
    pinoLogger.error(`error parsing fetch NFT response: ${errorMessage(err)}`)
    throw err
  }
}
