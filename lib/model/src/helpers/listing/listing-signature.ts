import type { Listing } from '@echo/model/types/listing'
import { listingSignatureSchema } from '@echo/model/validators/listing-schema'
import objectHash from 'object-hash'

export function listingSignature(listing: Pick<Listing, 'creator' | 'items' | 'target'>): string {
  const listingIndex = listingSignatureSchema.parse(listing)
  return objectHash(listingIndex)
}
