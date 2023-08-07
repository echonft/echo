/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildContract } from '../../builders/contract/build-contract'
import { convertContract } from '../../converters/contract/convert-contract'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreContractData, FirestoreContractPrototype } from '@echo/firestore'
import { andThen, partial, pipe } from 'ramda'

export const addContract: (contractPrototype: FirestoreContractPrototype) => Promise<FirestoreContractData> = (
  contractPrototype
) =>
  // @ts-ignore
  pipe(
    buildContract,
    // @ts-ignore
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.CONTRACTS).doc()])),
    andThen(convertContract)
  )(contractPrototype)
