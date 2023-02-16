import { FirestoreDocumentSnapshot, FirestoreMapper } from '../../types'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { dataProp, id } from '../mapper-helper'
import { Contract, TokenType } from '@echo/model'
import { applySpec, toPromise } from '@echo/utils'
import { pipe } from 'ramda'

export const mapContract: FirestoreMapper<FirestoreContract, Contract> = pipe(
  applySpec<FirestoreDocumentSnapshot<FirestoreContract>, Contract>({
    id: id,
    address: dataProp<FirestoreContract, 'address'>('address'),
    chainId: dataProp<FirestoreContract, 'chainId'>('chainId'),
    tokenType: dataProp<FirestoreContract, 'tokenType', TokenType>('tokenType'),
    name: dataProp<FirestoreContract, 'name'>('name'),
    symbol: dataProp<FirestoreContract, 'symbol'>('symbol')
  }),
  toPromise
)
