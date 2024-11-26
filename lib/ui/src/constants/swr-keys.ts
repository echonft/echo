import { serializeNft } from '@echo/model/serializers/serialize-nft'
import type { Address } from '@echo/model/types/address'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { concat, join, map, pipe, prop } from 'ramda'

export const SWRKeys = {
  contract: {
    areNftsInEscrow: pipe<[Nft[]], string[], string, string>(
      map(serializeNft),
      join('-'),
      concat('are-nfts-in-escrow-')
    ),
    getEchoTradingFees: 'get-echo-trading-fees',
    getErc721approval: (contract: Address) => `get-erc721-approval-${contract}`,
    approveErc721: (contract: Address) => `approve-erc721-${contract}`,
    createOffer: pipe<[Offer], string, string>(prop('slug'), concat('create-offer-')),
    getAllTokensBalance: 'get-all-tokens-balance'
  },
  listing: {
    cancel: pipe<[Listing], string, string>(prop('slug'), concat('cancel-listing-')),
    create: 'create-listing'
  },
  offer: {
    contractAccept: pipe<[Offer], string, string>(prop('slug'), concat('contract-accept-offer-')),
    contractCancel: pipe<[Offer], string, string>(prop('slug'), concat('contract-cancel-offer-')),
    contractCreate: 'contract-create-offer',
    contractRedeem: pipe<[Offer], string, string>(prop('slug'), concat('contract-redeem-offer-')),
    getByIdContract: concat('get-offer-by-id-contract-'),
    get: pipe<[Offer], string, string>(prop('slug'), concat('get-offer-')),
    reject: pipe<[Offer], string, string>(prop('slug'), concat('reject-offer-')),
    sign: pipe<[Offer], string, string>(prop('slug'), concat('sign-offer-')),
    validate: pipe<[Offer], string, string>(prop('slug'), concat('validate-offer-'))
  },
  swap: {
    execute: pipe<[Offer], string, string>(prop('slug'), concat('execute-swap-'))
  }
}
