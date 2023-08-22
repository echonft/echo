import { Offer } from '../../types/model/offer'
import { getNftCollectionGuild } from '../nft-collection/get-nft-collection-guild'

export const getOfferReceiverGuild = (offer: Offer) => getNftCollectionGuild(offer.receiverItems[0].collection)
