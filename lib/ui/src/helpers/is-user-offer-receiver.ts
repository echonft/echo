import { Offer, User } from '@echo/ui-model'

export const isUserOfferReceiver = (user: User, offer: Offer) => offer.receiver.id === user.id
