import { Contract } from '../../../../types/contract'
import { TokenType } from '../../../../types/token-type'
import { mockContractErc721 } from './mock-contract-erc721'
import { complement, isNil, mergeLeft, pickBy } from 'ramda'

export const generateMockContract: (contractData: {
  id?: string
  address?: string
  chainId?: number
  tokenType?: TokenType
  name?: string
  symbol?: string
}) => Contract = (contractData) => mergeLeft(pickBy(complement(isNil), contractData), mockContractErc721)
