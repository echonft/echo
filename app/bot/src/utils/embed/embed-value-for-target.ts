import { FirestoreContractData } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'

export function embedValueForTarget(target: FirestoreContractData): string {
  if (isNilOrEmpty(target.name) && isNilOrEmpty(target.symbol)) {
    return `Any NFT from contract ${target.address}`
  }
  // We can disable the check here because both values will never be none as per previous check
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `Any NFT from ${target.name ?? target.symbol}`
}
