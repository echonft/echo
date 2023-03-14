import { AlchemyOwnedNft } from '../types'
import { mapNft } from './map-nft'
import { OwnedNft } from 'alchemy-sdk'
import { converge, mergeDeepLeft, omit, pick, pipe } from 'ramda'

export const mapOwnedNft: (nft: OwnedNft) => AlchemyOwnedNft = converge<
  AlchemyOwnedNft,
  [(ownedNft: OwnedNft) => Omit<AlchemyOwnedNft, 'balance'>, (ownedNft: OwnedNft) => Pick<AlchemyOwnedNft, 'balance'>]
>(mergeDeepLeft, [pipe(omit(['balance']), mapNft), pick(['balance'])])
