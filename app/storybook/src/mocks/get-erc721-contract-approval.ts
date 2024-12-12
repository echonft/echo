import { contractApprovalStore } from '@echo/storybook/mocks/stores/contract-approval-store'
import { rangeDelay } from 'delay'

export function getErc721ContractApproval(): Promise<boolean> {
  const value = contractApprovalStore.getState().approved
  return rangeDelay(800, 1600, { value })
}
