import type { Contract } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'
import {
  mapOfferItemsToContractOfferItems,
  type MapOfferItemsToContractOfferItemsArgs
} from '@echo/web3-dom/mappers/map-offer-items-to-contract-offer-items'
import type { ContractCreateOffer } from '@echo/web3-dom/types/contract-create-offer'
import { ContractOfferState } from '@echo/web3-dom/types/contract-offer-state'
import { always, applySpec, path, pipe, prop } from 'ramda'

function formatWalletAddress(wallet: Wallet | Contract) {
  return pipe<[Wallet | Contract], Record<'address', HexString>, HexString>(pick(['address']), formatAddress)(wallet)
}

export function mapOfferToContractCreateOffer(args: CreateOfferArgs): ContractCreateOffer {
  return applySpec<ContractOffer>({
    sender: pipe(prop('sender'), formatWalletAddress),
    receiver: pipe(prop('receiver'), formatWalletAddress),
    senderItems: pipe(
      applySpec<MapOfferItemsToContractOfferItemsArgs>({
        items: prop('senderItems'),
        chainId: prop('chainId')
      }),
      mapOfferItemsToContractOfferItems
    ),
    receiverItems: pipe(
      applySpec<MapOfferItemsToContractOfferItemsArgs>({
        items: prop('receiverItems'),
        chainId: prop('chainId')
      }),
      mapOfferItemsToContractOfferItems
    ),
    expiration: prop('expiration'),
    state: always(ContractOfferState.OPEN)
  })(offer)
}
