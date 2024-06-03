import type { Collection } from '@echo/model/types/collection'
import { mapNftResponse, type MapNftResponseArgs } from '@echo/nft-scan/mappers/map-nft-response'
import { getAllNftsByAccountDataResponseSchema } from '@echo/nft-scan/validators/get-all-nfts-by-account-data-response-schema'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { ChainName } from '@echo/utils/types/chain-name'
import { always, applySpec, identity, map, pipe, prop, toLower } from 'ramda'

export interface MapGetAllNftsByAccountResponseArgs {
  response: ReturnType<typeof getAllNftsByAccountDataResponseSchema.parse>
  chain: ChainName
}

export interface MapGetAllNftsByAccountResponseReturn {
  contract: Pick<Collection, 'contract'>
  nfts: ReturnType<typeof mapNftResponse>[]
}

export function mapGetAllNftsByAccountResponse(
  args: MapGetAllNftsByAccountResponseArgs
): MapGetAllNftsByAccountResponseReturn[] {
  const {
    response: { data },
    chain
  } = args
  try {
    return pipe<[MapGetAllNftsByAccountResponseArgs['response']['data']], MapGetAllNftsByAccountResponseReturn[]>(
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
