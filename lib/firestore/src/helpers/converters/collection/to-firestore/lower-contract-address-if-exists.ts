import { lowerContractAddress } from '@echo/firestore/helpers/converters/collection/lower-contract-address'
import type { Collection, Contract } from '@echo/model/types/collection'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

const key = 'contract'
type Key = typeof key

export function lowerContractAddressIfExists(collection: WithFieldValue<Collection>) {
  return whenHas<Key, WithFieldValue<Collection>, Contract, WithFieldValue<Collection>>(
    key,
    lowerContractAddress
  )(collection)
}
