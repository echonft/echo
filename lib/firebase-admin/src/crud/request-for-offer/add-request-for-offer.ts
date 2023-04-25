/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildRequestForOffer } from '../../builders/request-for-offer/build-request-for-offer'
import { convertRequestForOffer } from '../../converters/request-for-offer/convert-request-for-offer'
import { FirestoreRequestForOfferPrototype } from '../../types/prototypes/request-for-offer/firestore-request-for-offer-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { FirestoreRequestForOffer, mapRequestForOffer } from '@echo/firestore'
import { RequestForOffer } from '@echo/model'
import { castAs } from '@echo/utils'
import { DocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { andThen, pipe, unless } from 'ramda'

export const addRequestForOffer: (
  requestForOfferPrototype: FirestoreRequestForOfferPrototype
) => Promise<R.Result<RequestForOffer, Error>> = (requestForOfferPrototype) =>
  // @ts-ignore
  pipe(
    // @ts-ignore

    buildRequestForOffer(requestForOfferPrototype),
    andThen<FirestoreRequestForOffer, R.Result<DocumentSnapshot<FirestoreRequestForOffer>, Error>>((requestsForOffer) =>
      setDocAndReturnSnapshot<FirestoreRequestForOffer>(
        // @ts-ignore

        getCollectionFromPath('requests-for-offer').doc(),
        requestsForOffer
      )
    ),
    andThen(
      // @ts-ignore

      unless(
        R.isError,
        pipe(
          R.getExn,
          (snapshot) => snapshot.data(),
          castAs,
          convertRequestForOffer,
          mapRequestForOffer,
          R.fromPromise<RequestForOffer>
        )
      )
    )
  )
