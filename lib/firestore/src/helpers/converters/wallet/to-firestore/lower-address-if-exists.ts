import { lowerAddress } from '@echo/firestore/helpers/converters/wallet/lower-address'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { EvmAddress } from '@echo/model/types/evm-address'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

const key = 'address'
type Key = typeof key
export function lowerAddressIfExists(wallet: WithFieldValue<WalletDocumentData>) {
  return whenHas<Key, WithFieldValue<WalletDocumentData>, EvmAddress, WithFieldValue<WalletDocumentData>>(
    key,
    lowerAddress
  )(wallet)
}
