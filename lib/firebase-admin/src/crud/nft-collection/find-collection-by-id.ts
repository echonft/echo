import { getFirestoreNftCollectionData } from '../../data/nft-collection/get-firestore-nft-collection-data'
import { FirestoreNftCollectionData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findCollectionById = (id: string) =>
  pipe(getFirestoreNftCollectionData, R.fromPromise<FirestoreNftCollectionData>)(id)
