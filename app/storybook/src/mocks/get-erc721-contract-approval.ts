import { contractApprovalStore } from '@echo/storybook/mocks/stores/contract-approval-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc721-contract-approval-args'
import { pipe, prop } from 'ramda'

export function getErc721ContractApproval(_args: GetErc721ContractApprovalArgs): Promise<boolean> {
  return pipe(prop('approved'), toPromise, delayPromise(800))(contractApprovalStore.getState())
}
