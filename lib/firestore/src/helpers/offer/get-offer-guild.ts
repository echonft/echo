import { Offer } from '../../types/model/offer'
import { getNftCollectionGuild } from '../nft-collection/get-nft-collection-guild'

export const getOfferGuild = (offer: Offer) => getNftCollectionGuild(offer.senderItems[0].collection)
