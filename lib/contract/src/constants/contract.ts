import { Contract } from '../types'
import { contractAbi } from './contract-abi'
import { contractAddress } from './contract-address'

export const contract: Contract = {
  addressOrName: contractAddress,
  contractInterface: contractAbi,
}
