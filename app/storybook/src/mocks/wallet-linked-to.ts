import { userMockCrew } from '@echo/model/mocks/user-mock'
import type { Address } from '@echo/model/types/address'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { toPromise } from '@echo/utils/helpers/to-promise'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export async function walletLinkedTo(_wallet: Address): Promise<Nullable<string>> {
  return pipe(toPromise, delayPromise(800))(userMockCrew.username)
}
