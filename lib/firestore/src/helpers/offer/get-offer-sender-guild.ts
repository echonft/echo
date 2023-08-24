import { Offer } from '../../types/model/offer'
import { getNftCollectionGuild } from '../nft-collection/get-nft-collection-guild'

export const getOfferSenderGuild = (offer: Offer) => getNftCollectionGuild(offer.senderItems[0].nft.collection)
