import { offerDocumentToModel } from '@echo/firestore/converters/offer-document-to-model'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { User } from '@echo/model/types/user'
import { setOfferRoleForUser } from '@echo/ui/helpers/offer/set-offer-role-for-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function toOfferWithRole(user: Nullable<User>) {
  return function (offer: OfferDocument) {
    return pipe(offerDocumentToModel, setOfferRoleForUser(user))(offer)
  }
}
