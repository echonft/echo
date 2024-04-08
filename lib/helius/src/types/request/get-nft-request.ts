import { ApiMethods } from '@echo/helius/constants/api-methods'
import type { HeliusRequest } from '@echo/helius/types/request/helius-request'

interface GetNftParams {
  id: string
  displayOptions?: {
    showUnverifiedCollections?: boolean
    showCollectionMetadata?: boolean
    showFungible?: boolean
    showInscription?: boolean
  }
}

export type GetNftRequest = HeliusRequest<GetNftParams, ApiMethods.GET_ASSET>
