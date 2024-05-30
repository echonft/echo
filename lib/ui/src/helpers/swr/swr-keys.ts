import type { Contract } from '@echo/model/types/collection'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { concat, join, map, pipe } from 'ramda'

// TODO Extract those functions
function contractKey(contract: Contract) {
  return `${contract.address}-${contract.chain}`
}

function offerKey(offer: Offer) {
  return offer.slug
}

function listingKey(listing: Listing) {
  return listing.slug
}

function nftKey(nft: Nft) {
  return `${nft.collection.contract.address}:${nft.tokenId}`
}

export const SWRKeys = {
  contract: {
    areNftsInEscrow: pipe<[Nft[]], string[], string, string>(map(nftKey), join('-'), concat('are-nfts-in-escrow-')),
    getEchoTradingFees: 'get-echo-trading-fees',
    getErc721approval: pipe<[Contract], string, string>(contractKey, concat('get-erc721-approval-')),
    approveErc721: pipe<[Contract], string, string>(contractKey, concat('approve-erc721-')),
    createOffer: pipe<[Offer], string, string>(offerKey, concat('create-offer-'))
  },
  listing: {
    cancel: pipe<[Listing], string, string>(listingKey, concat('cancel-listing-')),
    create: 'create-listing'
  },
  offer: {
    accept: pipe<[Offer], string, string>(offerKey, concat('accept-offer-')),
    cancel: pipe<[Offer], string, string>(offerKey, concat('cancel-offer-')),
    contractAccept: pipe<[Offer], string, string>(offerKey, concat('contract-accept-offer-')),
    contractCancel: pipe<[Offer], string, string>(offerKey, concat('contract-cancel-offer-')),
    contractCreate: 'contract-create-offer',
    contractRedeem: pipe<[Offer], string, string>(offerKey, concat('contract-redeem-offer-')),
    create: 'create-offer',
    get: pipe<[Offer], string, string>(offerKey, concat('get-offer-')),
    getSignature: pipe<[Offer], string, string>(offerKey, concat('get-offer-signature-')),
    reject: pipe<[Offer], string, string>(offerKey, concat('reject-offer-')),
    sign: pipe<[Offer], string, string>(offerKey, concat('sign-offer-')),
    validate: pipe<[Offer], string, string>(offerKey, concat('validate-offer-'))
  },
  profile: {
    nonce: {
      get: 'get-nonce',
      sign: 'sign-nonce'
    },
    wallet: {
      add: 'add-wallet',
      get: 'get-wallets'
    }
  },
  swap: {
    execute: pipe<[Offer], string, string>(offerKey, concat('execute-swap-'))
  }
}
