import { ApiMethods } from '@echo/helius/constants/api-methods'
import type { HeliusRequest } from '@echo/helius/types/request/helius-request'
import type { WithPagingParams } from '@echo/helius/types/request/params/with-paging-params'
import type { WithSortParams } from '@echo/helius/types/request/params/with-sort-params'

interface GetNftsForOwnerRequestParams extends WithPagingParams, WithSortParams {
  ownerAddress: string
  options?: {
    showUnverifiedCollections?: boolean
    showCollectionMetadata?: boolean
    showGrandTotal?: boolean
    showFungible?: boolean
    showNativeBalance?: boolean
    showInscription?: boolean
    showZeroBalance?: boolean
  }
}

export type GetNftsForOwnerRequest = HeliusRequest<GetNftsForOwnerRequestParams, ApiMethods.GET_ASSETS_FOR_OWNER>
