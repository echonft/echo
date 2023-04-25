import { getFirestoreContractRefByAddressAndChainId } from '../../data/contract/get-firestore-contract-ref-by-address-and-chain-id'
import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreRequestForOfferItemPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-item-prototype'
import { FirestoreRequestForOfferItem } from '@echo/firestore'
import { R } from '@mobily/ts-belt'

export const buildRequestForOfferItem: FirestoreBuilder<
  FirestoreRequestForOfferItemPrototype,
  FirestoreRequestForOfferItem
> = async (prototype) => {
  const contractResult = await getFirestoreContractRefByAddressAndChainId(
    prototype.contract.address,
    prototype.contract.chainId
  )
  if (R.isError(contractResult)) {
    throw Error('buildRequestForOfferItem contract does not exist')
  }
  return {
    contract: R.getExn(contractResult),
    tokenId: prototype.tokenId,
    balance: prototype.balance
  } as unknown as FirestoreRequestForOfferItem
}
