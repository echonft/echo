import { ApiMethods } from '@echo/alchemy/helius/constants/api-methods'
import { getHeliusApiUrl } from '@echo/alchemy/helius/constants/get-helius-api-url'
import { buildHeliusRequestBody } from '@echo/alchemy/helius/helpers/build-helius-request-body'
import { mapGetNftsForOwnerResponse } from '@echo/alchemy/helius/mappers/map-get-nfts-for-owner-response'
import type { HeliusRequestGetNftsForOwnerParams } from '@echo/alchemy/helius/types/request/helius-request-get-nfts-for-owner-params'
import type { HeliusGetNftsForOwnerResponse } from '@echo/alchemy/helius/types/response/helius-get-nfts-for-owner-response'
import type { HeliusResponse } from '@echo/alchemy/helius/types/response/helius-response'
import type { User } from '@echo/model/types/user'
import axios from 'axios'

// TODO Lots of crap from this call, we should clean this somehow
export function getSolanaNftsForOwner(owner: User) {
  return axios
    .post<HeliusResponse<HeliusGetNftsForOwnerResponse>>(
      getHeliusApiUrl(),
      buildHeliusRequestBody<HeliusRequestGetNftsForOwnerParams>(ApiMethods.GET_ASSETS_FOR_OWNER, {
        ownerAddress: '86xCnPeV69n6t3DnyGvkKobf9FdN2H9oiVDdaMpo2MMY',
        page: 1,
        limit: 1000
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then((response) => mapGetNftsForOwnerResponse(response.data.result, owner))
}
