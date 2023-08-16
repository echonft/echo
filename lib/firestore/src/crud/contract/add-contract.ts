/* eslint-disable @typescript-eslint/ban-ts-comment */
import { buildContract } from '../../builders/contract/build-contract'
import { CollectionName } from '../../constants/collection-name'
import { convertContract } from '../../converters/contract/convert-contract'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../helpers/document/set-doc-and-return-snapshot'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { FirestoreContractPrototype } from '../../types/prototypes/contract/firestore-contract-prototype'
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
