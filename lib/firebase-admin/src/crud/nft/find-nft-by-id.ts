import { getFirestoreNftData } from '../../data/nft/get-firestore-nft-data'
import { FirestoreNftData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findNftById = (id: string) => pipe(getFirestoreNftData, R.fromPromise<FirestoreNftData>)(id)
