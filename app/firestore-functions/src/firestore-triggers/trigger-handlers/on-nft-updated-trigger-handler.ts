import { changeSnapshotDataPropUpdated } from '@echo/firestore-functions/firestore-triggers/helpers/change-snapshot-data-prop-updated'
import type { FirestoreEventChangeSnapshotDataReturn } from '@echo/firestore-functions/firestore-triggers/helpers/firestore-event-change-snapshot-data'
import { cancelListing } from '@echo/firestore/crud/listing/cancel-listing'
import { getListingsForNft } from '@echo/firestore/crud/listing/get-listings-for-nft'
import { getEscrowedNftSnapshot } from '@echo/firestore/crud/nft/get-escrowed-nft-snapshot'
import { cancelOffer } from '@echo/firestore/crud/offer/cancel-offer'
import { getOffersForNft } from '@echo/firestore/crud/offer/get-offers-for-nft'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import { error, info } from 'firebase-functions/logger'
import { always, andThen, isNil, otherwise, pipe, prop } from 'ramda'

export async function onNftUpdatedTriggerHandler(data: FirestoreEventChangeSnapshotDataReturn<NftDocument>) {
  info({ id: data.id, after: data.after, before: data.before }, 'nft was updated')
  const { before, after, updated } = changeSnapshotDataPropUpdated<NftDocument, 'owner'>(data, 'owner', eqUser)
  if (updated) {
    info({ nft: data.after, after, before }, 'owner changed')
    const nft = data.after ?? data.before
    if (!isNil(nft)) {
      // Check if the NFT is escrowed, the check for data.id is for typing, it should always be present
      if (!isNil(data.id)) {
        const escrowedNftSnapshot = await getEscrowedNftSnapshot(data.id)
        if (escrowedNftSnapshot?.exists) {
          info(
            { nft: data.after, after: data.after, before: data.before },
            'nft is escrowed, will not cancel listings or'
          )
          return
        }
      }
      const listings = await pipe(getListingsForNft, otherwise(always([] as ListingDocument[])))(nft)
      for (const listing of listings) {
        await pipe(
          prop('slug'),
          cancelListing,
          andThen(() => {
            info({ nft: data.after, listing }, 'cancelled listing tied to nft')
          }),
          otherwise((err) => {
            error({ err, listing }, 'could not cancel listing')
          })
        )(listing)
      }
      const offers = await pipe(getOffersForNft, otherwise(always([] as OfferDocument[])))(nft)
      for (const offer of offers) {
        await pipe(
          prop('slug'),
          cancelOffer,
          andThen(() => {
            info({ nft: data.after, offer }, 'cancelled offer tied to nft')
          }),
          otherwise((err) => {
            error({ err, offer }, 'could not cancel offer')
          })
        )(offer)
      }
    }
  } else {
    info({ nft: data.after, after: data.after, before: data.before }, 'owner did not change, nothing to do')
  }
}
