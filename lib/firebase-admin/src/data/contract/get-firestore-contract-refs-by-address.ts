import { getFirestoreContractRefByAddress } from './get-firestore-contract-ref-by-address'
import { FirestoreContract } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { DocumentReference } from '@google-cloud/firestore'
import { andThen, converge, isNil, map, pipe, prop, reject } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}

/**
 * Fetches all the refs for the contract addresses and chain. Discard all the ones that are not in the database.
 * Returns [] if empty or if no contracts are found
 * @param contractsData The data of the contracts to fetch
 */
export const getFirestoreContractRefsByAddress = pipe(
  map(converge(getFirestoreContractRefByAddress, [prop('address'), prop('chainId')])),
  promiseAll,
  andThen(reject(isNil))
) as unknown as (contractsData: ContractQuery[]) => Promise<DocumentReference<FirestoreContract>[]>
