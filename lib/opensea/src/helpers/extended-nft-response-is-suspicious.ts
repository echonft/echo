import type { NftExtendedResponse } from '@echo/opensea/types/response/nft-extended-response'

export function extendedNftResponseIsSuspicious(response: NftExtendedResponse) {
  return response.is_suspicious
}
