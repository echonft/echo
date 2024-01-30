import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'

export function getErc721ContractApproval(approved: boolean) {
  return function (_args: GetErc721ContractApprovalArgs): Promise<boolean> {
    return delayPromise(Promise.resolve(approved), 1200)
  }
}
