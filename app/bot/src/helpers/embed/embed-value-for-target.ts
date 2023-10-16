import type { ListingTarget } from '@echo/model/types/listing-target'

export function embedValueForTarget(target: ListingTarget): string {
  return `Any NFT from ${target.collection.name}`
}
