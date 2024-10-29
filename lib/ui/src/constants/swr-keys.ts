import type { Contract } from '@echo/model/types/contract'
import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { keyOf } from '@echo/ui/components/nft/key-of'
import { concat, join, map, pipe, prop } from 'ramda'

export const SWRKeys = {
  contract: {
    areNftsInEscrow: pipe<[Nft[]], string[], string, string>(map(keyOf), join('-'), concat('are-nfts-in-escrow-')),
    getEchoTradingFees: 'get-echo-trading-fees',
    getErc721approval: pipe<[Contract], string, string>(
      (contract: Contract) => `${contract.address}-${contract.chain}`,
      concat('get-erc721-approval-')
    ),
    approveErc721: pipe<[Contract], string, string>(
      (contract: Contract) => `${contract.address}-${contract.chain}`,
      concat('approve-erc721-')
    ),
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
