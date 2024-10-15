import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerAddressIfExists(wallet: WithFieldValue<WalletDocumentData>) {
  return whenHas('address', lowerAddress<WithFieldValue<WalletDocumentData>>)(wallet)
}
