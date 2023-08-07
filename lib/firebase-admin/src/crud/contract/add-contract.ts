import { buildContract } from '../../builders/contract/build-contract'
import { convertContract } from '../../converters/contract/convert-contract'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreContractData, FirestoreContractPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addContract: (
  contractPrototype: FirestoreContractPrototype
) => Promise<R.Result<FirestoreContractData, Error>> = (contractPrototype) =>
  pipe(
    buildContract,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.CONTRACTS).doc()])),
    andThen(
      pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertContract, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreContractData, Error>>>
      )
    )
  )(contractPrototype)
