import { ContractQuery } from '../../types/query/contract-query'
import { getFirestoreContractRefByAddressAndChainId } from './get-firestore-contract-ref-by-address-and-chain-id'
import { FirestoreContract } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { isNil, reject } from 'ramda'

/**
 * Fetches all the refs for the contract addresses and chain. Discard all the ones that are not in the database.
 * Returns [] if empty or if no contracts are found
 * @param contractsData The data of the contracts to fetch
 */
export function getFirestoreContractRefsByAddressAndChainId(
  contractsData: ContractQuery[]
): Promise<DocumentReference<FirestoreContract>[]> {
  return Promise.all(
    contractsData.map(({ address, chainId }) =>
      getFirestoreContractRefByAddressAndChainId(address, chainId).then(R.toUndefined)
    )
  ).then(reject(isNil)) as Promise<DocumentReference<FirestoreContract>[]>
}
