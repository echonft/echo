import { type AlchemyContract } from '@echo/alchemy/types/model/alchemy-contract'
import { type AlchemyContractResponse } from '@echo/alchemy/types/response/alchemy-contract-response'
import { assoc, modify, partialRight, pick, pipe } from 'ramda'
import { getAddress } from 'viem'

export function mapAlchemyContractResponseToAlchemyContract(chainId: number) {
  return function (contractResponse: AlchemyContractResponse): AlchemyContract {
    return pipe(
      pick(['address', 'tokenType', 'name', 'symbol']),
      modify('address', partialRight(getAddress, [chainId])),
      assoc('chainId', chainId)
    )(contractResponse) as AlchemyContract
  }
}
