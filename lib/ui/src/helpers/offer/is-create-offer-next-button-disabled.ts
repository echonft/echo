import type { OwnedNft } from '@echo/model/types/nft'

export function isCreateOfferNextButtonDisabled(
  senderSelection: OwnedNft[],
  receiverSelection: OwnedNft[],
  step: number
) {
  if (step === 0) {
    return receiverSelection.length === 0
  } else if (step === 1) {
    return receiverSelection.length === 0 || senderSelection.length === 0
  }
  return false
}
