import { Contract } from '../../../../types/contract'
import { TokenType } from '../../../../types/token-type'
import { mockContractErc721 } from './mock-contract-erc721'
import { mergeLeft } from 'ramda'

export const generateMockContract: (contractData: {
  id?: string
  address?: string
  chainId?: number
  tokenType?: TokenType
  name?: string
  symbol?: string
}) => Contract = (contractData) => mergeLeft(contractData, mockContractErc721)
