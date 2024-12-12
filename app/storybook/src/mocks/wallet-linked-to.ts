import { userMockCrew } from '@echo/model/mocks/user-mock'
import type { Address } from '@echo/model/types/address'
import type { Nullable } from '@echo/utils/types/nullable'
import { rangeDelay } from 'delay'

export async function walletLinkedTo(_wallet: Address): Promise<Nullable<string>> {
  return rangeDelay(800, 1600, { value: userMockCrew.username })
}
