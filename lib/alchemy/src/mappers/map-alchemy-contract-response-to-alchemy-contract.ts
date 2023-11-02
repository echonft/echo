import { type AlchemyContract } from '@echo/alchemy/types/model/alchemy-contract'
import { type AlchemyContractResponse } from '@echo/alchemy/types/response/alchemy-contract-response'
import { formatAddress } from '@echo/utils/helpers/format-address'
import { assoc, modify, partialRight, pick, pipe } from 'ramda'

export function mapAlchemyContractResponseToAlchemyContract(chainId: number) {
  return function (contractResponse: AlchemyContractResponse): AlchemyContract {
    return pipe<
      [AlchemyContractResponse],
      Pick<AlchemyContractResponse, 'address' | 'tokenType' | 'name' | 'symbol'>,
      Pick<AlchemyContractResponse, 'address' | 'tokenType' | 'name' | 'symbol'>,
      AlchemyContract
    >(
      pick(['address', 'tokenType', 'name', 'symbol']),
      modify('address', partialRight(formatAddress, [chainId])),
      assoc('chainId', chainId)
    )(contractResponse)
  }
}
