import { lowerContractAddress } from '@echo/firestore/helpers/converters/collection/lower-contract-address'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import { whenHas } from '@echo/utils/fp/when-has'
import type { WithFieldValue } from 'firebase-admin/firestore'

export function lowerContractAddressIfExists(collection: WithFieldValue<Collection>) {
  return whenHas<'contract', WithFieldValue<Collection>, Contract, WithFieldValue<Collection>>(
    'contract',
    lowerContractAddress
  )(collection)
}
