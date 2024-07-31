import type { OFFER_UPDATE_KINDS } from '@echo/firestore/constants/offer/offer-update-kinds'

export type OfferUpdateKind = (typeof OFFER_UPDATE_KINDS)[number]
