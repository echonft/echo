import { mapNftResponse } from '@echo/alchemy/mappers/map-nft-response'
import { type AlchemyPagingResult } from '@echo/alchemy/types/paging/alchemy-paging-result'
import { type GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import type { NftResponse } from '@echo/alchemy/types/response/nft-response'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { logger } from '@echo/utils/services/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { find, isNil, map, pathEq, pipe, prop, reject, toLower } from 'ramda'

export function mapGetNftsForOwnerResponse(collections: Collection[], owner: User) {
  return function (response: GetNftsForOwnerResponse): AlchemyPagingResult<Omit<Nft, 'id' | 'updatedAt'>> {
    const data = pipe<
      [GetNftsForOwnerResponse],
      NftResponse[],
      Nullable<Omit<Nft, 'id' | 'updatedAt'>>[],
      Omit<Nft, 'id' | 'updatedAt'>[]
    >(
      prop('ownedNfts'),
      map<NftResponse, Nullable<Omit<Nft, 'id' | 'updatedAt'>>>((response) => {
        const collection = find(pathEq(toLower(response.contract.address), ['contract', 'address']), collections)
        if (isNil(collection)) {
          return undefined
        }
        try {
          return mapNftResponse(collection, owner, response)
        } catch (err) {
          logger.error(`error mapping NFT response from Alchemy ${JSON.stringify(response)}`)
          return undefined
        }
      }),
      reject(isNil)
    )(response)
    return { data, pageKey: response.pageKey }
  }
}
