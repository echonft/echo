import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { FirestoreContractData } from '@echo/firestore'
import { Contract } from '@echo/ui'
import { andThen, omit } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const mapContract: FirestoreMapper<FirestoreContractData, Contract> = andThen(omit(['refPath']))
