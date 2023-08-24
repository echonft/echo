import { ListingTarget } from '@echo/firestore'

export function embedValueForTarget(target: ListingTarget): string {
  return `Any NFT from ${target.collection.name}`
}
