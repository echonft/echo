import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export const OfferRoleReceiver = 'receiver'
export const OfferRoleSender = 'sender'
export const OFFER_ROLES: NonEmptyArray<string> = [OfferRoleReceiver, OfferRoleSender]
