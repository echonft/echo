import { contractApprovalStore } from '@echo/storybook/mocks/stores/contract-approval-store'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { pipe, prop } from 'ramda'

export function getErc721ContractApproval(): Promise<boolean> {
  return pipe(prop('approved'), toPromise, delayPromise(800))(contractApprovalStore.getState())
}
