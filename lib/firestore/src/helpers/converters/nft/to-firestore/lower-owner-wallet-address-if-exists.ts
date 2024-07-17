import { lowerOwnerWalletAddress } from '@echo/firestore/helpers/converters/nft/lower-owner-wallet-address'
import type { Nft } from '@echo/model/types/nft'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerOwnerWalletAddressIfExists(nft: WithFieldValue<Nft>) {
  return whenHas('owner', lowerOwnerWalletAddress, nft)
}
