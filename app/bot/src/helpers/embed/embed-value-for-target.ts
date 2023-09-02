import { ListingTarget } from '@echo/firestore-types'

export function embedValueForTarget(target: ListingTarget): string {
  return `Any NFT from ${target.collection.name}`
}
