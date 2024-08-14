import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { WithCounts } from '@echo/model/types/with-counts'
import { isNil } from 'ramda'

export function countsMockCrew(): WithCounts {
  return {
    listingsCount: 7,
    nftsCount: 10,
    swapsCount: 3,
    offersCount: 10
  }
}
export function countsMockJohnny(): WithCounts {
  return {
    listingsCount: 21,
    nftsCount: 150,
    swapsCount: 15,
    offersCount: 55
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
