import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { User } from '@echo/model/types/user'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { map, pipe } from 'ramda'

export function toOffersWithRole(user: Nullable<User>) {
  return function (offers: OfferDocument[]) {
    return map(pipe(offerDocumentToModel, setOfferRoleForUser(user)), offers)
  }
}
