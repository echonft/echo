import type { OwnedNft } from '@echo/model/types/owned-nft'

export function isNextButtonDisabled(senderSelection: OwnedNft[], receiverSelection: OwnedNft[], step: number) {
  if (step === 0) {
    return receiverSelection.length === 0
  } else if (step === 1) {
    return receiverSelection.length === 0 || senderSelection.length === 0
  }
  return false
}
