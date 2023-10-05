import type { NftResponse } from '@echo/api/types/responses/model/nft-response'
import { Nft } from '@echo/ui/types/model/nft'
import { modifyNumberPropToDate } from '@echo/utils/fp/modify-number-prop-to-date'

export function mapNftFromResponse(response: NftResponse) {
  return modifyNumberPropToDate<'updatedAt', NftResponse>('updatedAt')(response) as Nft
}
