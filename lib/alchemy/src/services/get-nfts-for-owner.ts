import { AlchemyRoutes } from '@echo/alchemy/constants/alchemy-routes'
import { getAlchemyRoute } from '@echo/alchemy/helpers/get-alchemy-route'
import { handleAlchemyPaging } from '@echo/alchemy/helpers/handle-alchemy-paging'
import { mapGetNftsForOwnerResponse } from '@echo/alchemy/mappers/map-get-nfts-for-owner-response'
import type { AlchemyRequestWithPaging } from '@echo/alchemy/types/request/alchemy-request-with-paging'
import type { GetNftsForOwnerRequest } from '@echo/alchemy/types/request/get-nfts-for-owner-request'
import type { GetNftsForOwnerResponse } from '@echo/alchemy/types/response/get-nfts-for-owner-response'
import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import axios, { type AxiosResponse } from 'axios'
import { stringify } from 'qs'
import { head, map, partialRight, path, pipe, prop } from 'ramda'

interface Args extends AlchemyRequestWithPaging {
  collections: NonEmptyArray<Collection>
  owner: User
}
function fetchNftsForOwner(args: Args) {
  const { collections, owner } = args
  return axios
    .get<GetNftsForOwnerResponse, AxiosResponse<GetNftsForOwnerResponse>, GetNftsForOwnerRequest>(
      getAlchemyRoute(
        AlchemyRoutes.GET_NFTS_FOR_OWNER,
        pipe<[NonEmptyArray<Collection>], Collection, number>(
          head,
          nonNullableReturn(path(['contract', 'chainId']))
        )(collections)
      ),
      {
        params: { owner: owner.wallet.address, contractAddresses: map(path(['contract', 'address']), collections) },
        paramsSerializer: partialRight(stringify, [{ arrayFormat: 'brackets' }])
      }
    )
    .then(pipe(prop('data'), mapGetNftsForOwnerResponse(collections, owner)))
}

// TODO We will need to split the calls when we have more than 45 contract addresses as Alchemy
// does not allow more than 45 addresses at a same time.
export function getNftsForOwner(collections: Collection[], owner: User): Promise<Omit<Nft, 'id' | 'updatedAt'>[]> {
  if (isNonEmptyArray(collections)) {
    return handleAlchemyPaging<Args, Omit<Nft, 'id' | 'updatedAt'>>(fetchNftsForOwner, {
      collections,
      owner
    })
  }
  return Promise.resolve([] as Omit<Nft, 'id' | 'updatedAt'>[])
}
