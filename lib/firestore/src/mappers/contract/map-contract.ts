import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { Contract } from '@echo/model'
import { andThen, omit, pipe } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mapContract: FirestoreMapper<FirestoreContractData, Contract> = andThen(pipe(omit(['refPath'])))
