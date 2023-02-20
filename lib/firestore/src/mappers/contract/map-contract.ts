import { FirestoreContractData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { Contract } from '@echo/model'
import { castAs } from '@echo/utils'
import { andThen } from 'ramda'

export const mapContract: FirestoreMapper<FirestoreContractData, Contract> = andThen(
  castAs<FirestoreContractData, Contract>
)
