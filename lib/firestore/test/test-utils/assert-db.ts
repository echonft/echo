import { assertListings } from '@test-utils/assert-listings'
import { assertNftCollections } from '@test-utils/assert-nft-collections'
import { assertNfts } from '@test-utils/assert-nfts'
import { assertOffers } from '@test-utils/assert-offers'
import { assertUsers } from '@test-utils/assert-users'

export async function assertDb() {
  await assertListings()
  await assertNftCollections()
  await assertNfts()
  await assertOffers()
  await assertUsers()
}
