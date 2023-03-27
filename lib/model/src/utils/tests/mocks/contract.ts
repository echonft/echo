import { Contract, TokenType } from '../../../types'
import { complement, isNil, mergeLeft, pickBy } from 'ramda'

export const mockContractErc721: Contract = {
  chainId: 1,
  name: 'Test Contract',
  address: '0x1234567890',
  symbol: 'TC',
  id: '1',
  tokenType: 'ERC721'
}

export const generateMockContract: (contractData: {
  id?: string
  address?: string
  chainId?: number
  tokenType?: TokenType
  name?: string
  symbol?: string
}) => Contract = (contractData) => mergeLeft(pickBy(complement(isNil), contractData), mockContractErc721)
