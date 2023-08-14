/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildContract } from '../../builders/contract/build-contract'
import { CollectionName } from '../../config/collection-name'
import { convertContract } from '../../converters/contract/convert-contract'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { FirestoreContractPrototype } from '../../types/prototypes/contract/firestore-contract-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
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
