import { type AlchemyContract } from '@echo/alchemy/types/model/alchemy-contract'
import { type ContractResponse } from '@echo/alchemy/types/response/contract-response'
import { assoc, modify, pick, pipe, toLower } from 'ramda'

export function mapAlchemyContractResponseToAlchemyContract(chainId: number) {
  return function (contractResponse: ContractResponse): AlchemyContract {
    return pipe<
      [ContractResponse],
      Pick<ContractResponse, 'address' | 'tokenType' | 'name' | 'symbol'>,
      Pick<ContractResponse, 'address' | 'tokenType' | 'name' | 'symbol'>,
      AlchemyContract
    >(
      pick(['address', 'tokenType', 'name', 'symbol']),
      modify('address', toLower),
      assoc('chainId', chainId)
    )(contractResponse)
  }
}
