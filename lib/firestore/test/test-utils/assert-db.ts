import { assertListings } from './assert-listings'
import { assertNftCollections } from './assert-nft-collections'
import { assertNfts } from './assert-nfts'
import { assertOffers } from './assert-offers'
import { assertUsers } from './assert-users'

export async function assertDb() {
  await assertListings()
  await assertNftCollections()
  await assertNfts()
  await assertOffers()
  await assertUsers()
}
