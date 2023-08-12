import { Contract } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { FirestoreContractData } from '@echo/firestore'
import { andThen, omit } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mapContract: FirestoreMapper<FirestoreContractData, Contract> = andThen(omit(['refPath']))
