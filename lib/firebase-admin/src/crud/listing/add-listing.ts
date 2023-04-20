import { FirestoreUserPrototype } from '../../types/prototypes/user/firestore-user-prototype'
import { RequestForOffer } from '@echo/model'
import { R } from '@mobily/ts-belt'

export const addListing: (listingPrototype: FirestoreUserPrototype) => Promise<R.Result<RequestForOffer, Error>> = (
  _listingPrototype
) => R.fromPromise(Promise.reject())
