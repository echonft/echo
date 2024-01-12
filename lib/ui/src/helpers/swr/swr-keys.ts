import type { Contract } from '@echo/model/types/contract'
import type { Listing } from '@echo/model/types/listing'
import type { Offer } from '@echo/model/types/offer'
import { concat, pipe } from 'ramda'

function contractKey(contract: Contract) {
  return `${contract.address}-${contract.chainId}`
}
function offerKey(offer: Offer) {
  return offer.id
}
function listingKey(listing: Listing) {
  return listing.id
}

export const SWRKeys = {
  contract: {
    getErc721approval: 'get-erc721-approval',
    approveErc721: pipe<[Contract], string, string>(contractKey, concat('approve-erc721-'))
  },
  listing: {
    cancel: pipe<[Listing], string, string>(listingKey, concat('cancel-listing-')),
    create: 'create-listing'
  },
  offer: {
    accept: pipe<[Offer], string, string>(offerKey, concat('accept-offer-')),
    cancel: pipe<[Offer], string, string>(offerKey, concat('cancel-offer-')),
    create: 'create-offer',
    get: pipe<[Offer], string, string>(offerKey, concat('get-offer-')),
    getSignature: pipe<[Offer], string, string>(offerKey, concat('get-offer-signature-')),
    reject: pipe<[Offer], string, string>(offerKey, concat('reject-offer-')),
    sign: pipe<[Offer], string, string>(offerKey, concat('sign-offer-'))
  },
  profile: {
    nonce: {
      get: 'get-nonce',
      sign: 'sign-nonce'
    },
    wallet: {
      add: 'add-wallet'
    }
  },
  swap: {
    execute: pipe<[Offer], string, string>(offerKey, concat('execute-swap-'))
  }
}
