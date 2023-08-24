import { ListingTarget } from '../types/model/listing-target'

export const listingTargetCollectionEquals = (collectionId: string) => (target: ListingTarget) =>
  target.collection.id === collectionId
