import { FirestoreContractData } from '@echo/firestore'
import { isNilOrEmpty } from '@echo/utils'

export function embedValueForTarget(target: FirestoreContractData): string {
  if (isNilOrEmpty(target.name) && isNilOrEmpty(target.symbol)) {
    return `Any NFT from contract ${target.address}`
  }
  return `Any NFT from ${target.name ?? target.symbol ?? ''}`
}
