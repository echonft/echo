import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import type { Wallet } from '@echo/model/types/wallet'
import { keyOf } from '@echo/ui/components/nft/key-of'
import { concat, join, map, pipe, prop } from 'ramda'

// TODO add to the model interface
function contractKey(contract: Wallet) {
  return `${contract.address}-${contract.chain}`
}

export const SWRKeys = {
  contract: {
    areNftsInEscrow: pipe<[Nft[]], string[], string, string>(map(keyOf), join('-'), concat('are-nfts-in-escrow-')),
    getEchoTradingFees: 'get-echo-trading-fees',
    getErc721approval: pipe<[Wallet], string, string>(contractKey, concat('get-erc721-approval-')),
    approveErc721: pipe<[Wallet], string, string>(contractKey, concat('approve-erc721-')),
    createOffer: pipe<[Offer], string, string>(prop('slug'), concat('create-offer-'))
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
    execute: pipe<[Offer], string, string>(prop('slug'), concat('execute-swap-'))
  }
}
