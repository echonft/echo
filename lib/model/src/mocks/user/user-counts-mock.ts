import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { WithCounts } from '@echo/model/types/with-counts'
import { isNil } from 'ramda'

export function countsMockCrew(): WithCounts {
  return {
    listingsCount: 0,
    nftsCount: 2,
    offersCount: 2,
    swapsCount: 0
  }
}
export function countsMockJohnny(): WithCounts {
  return {
    listingsCount: 1,
    nftsCount: 4,
    offersCount: 2,
    swapsCount: 0
  }
}

export function getCountsByUsername(username: string) {
  const countsMock: Record<string, WithCounts> = {
    crewnft_: countsMockCrew(),
    johnnycagewins: countsMockJohnny()
  }

  const mock = countsMock[username]
  if (isNil(mock)) {
    throw Error(`wrong counts mock username: ${username}`)
  }
  return mock
}

export function getCountsMock(): WithCounts {
  return getCountsByUsername(userMockJohnnyUsername())
}
