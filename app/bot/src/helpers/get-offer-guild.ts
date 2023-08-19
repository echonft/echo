import { getCollectionGuild } from './get-collection-guild'
import { Offer } from '@echo/firestore'

export const getOfferGuild = (offer: Offer) => getCollectionGuild(offer.senderItems[0].collection)
