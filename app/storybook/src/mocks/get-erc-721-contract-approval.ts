import { contractApprovalStore } from '@echo/storybook/mocks/stores/contract-approval-store'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc-721-contract-approval-args'

export function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  const approved = contractApprovalStore.getState().approved
  return delayPromise(Promise.resolve(approved), 800)
}
