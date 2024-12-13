import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import { toOfferWithRole } from '@echo/frontend/lib/helpers/offer/to-offer-with-role'
import type { User } from '@echo/model/types/user'
import type { Nullable } from '@echo/utils/types/nullable'
import { map } from 'ramda'

export function toOffersWithRole(user: Nullable<User>) {
  return function (offers: OfferDocument[]) {
    return map(toOfferWithRole(user))(offers)
  }
}
