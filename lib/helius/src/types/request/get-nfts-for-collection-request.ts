import { ApiMethods } from '@echo/helius/constants/api-methods'
import type { HeliusRequest } from '@echo/helius/types/request/helius-request'
import type { WithPagingParams } from '@echo/helius/types/request/params/with-paging-params'
import type { WithSortParams } from '@echo/helius/types/request/params/with-sort-params'

interface GetNftsForCollectionRequestParams extends WithPagingParams, WithSortParams {
  groupKey: string
  groupValue: string
  displayOptions?: {
    showUnverifiedCollections?: boolean
    showCollectionMetadata?: boolean
    showGrandTotal?: boolean
    showInscription?: boolean
  }
}

export type GetNftsForCollectionRequest = HeliusRequest<
  GetNftsForCollectionRequestParams,
  ApiMethods.GET_ASSETS_BY_GROUP
>
