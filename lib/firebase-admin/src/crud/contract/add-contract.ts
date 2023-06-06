import { FirestoreContractData, FirestoreContractPrototype } from '../../../../firestore/src'
import { buildContract } from '../../builders/contract/build-contract'
import { convertContract } from '../../converters/contract/convert-contract'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe, unless } from 'ramda'

export const addContract: (
  contractPrototype: FirestoreContractPrototype
) => Promise<R.Result<FirestoreContractData, Error>> = (contractPrototype) =>
  pipe(
    buildContract,
    andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.CONTRACTS).doc()])),
    andThen(
      pipe(
        unless(R.isError, pipe(R.getExn, convertContract, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreContractData, Error>>>
      )
    )
  )(contractPrototype)
