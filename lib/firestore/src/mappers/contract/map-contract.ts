import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { Contract } from '@echo/model'
import { castAs } from '@echo/utils'
import { andThen, omit, pipe } from 'ramda'

export const mapContract: FirestoreMapper<FirestoreContractData, Contract> = andThen(
  pipe(omit(['refPath']), castAs<Contract>)
)
