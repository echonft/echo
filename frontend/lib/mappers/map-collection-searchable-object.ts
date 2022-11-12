import { SearchableObject } from '@lib/view-models/object'

/**
 * Map contract addresses to searchable objects
 * @param contractAddresses The addresses
 * TODO Should have a collection object here to make it cleaner
 */
export function mapCollectionSearchableObject(contractAddresses: string[]): SearchableObject<string>[] {
  return contractAddresses.map((address) => ({ value: address.toLowerCase(), id: address, label: address }))
}
