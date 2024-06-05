import type { Wallet } from '@echo/model/types/wallet'
import { userMockJohnnyUsername } from '@echo/model-mocks/user/user-mock'
import type { HexString } from '@echo/utils/types/hex-string'
import { isNil, toLower } from 'ramda'

export function walletMockCrewAddress(): Lowercase<HexString> {
  return toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D')
}
export function walletMockJohnnyAddress(): Lowercase<HexString> {
  return toLower('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e')
}

export function getWalletMockByUsername(username: string) {
  const walletMock: Record<string, Wallet> = {
    crewnft_: {
      chain: 'ethereum',
      address: walletMockCrewAddress()
    },
    johnnycagewins: {
      chain: 'ethereum',
      address: walletMockJohnnyAddress()
    }
  }

  const mock = walletMock[username]
  if (isNil(mock)) {
    throw Error(`wrong wallet mock username: ${username}`)
  }
  return mock
}

export function getWalletMock(): Wallet {
  return getWalletMockByUsername(userMockJohnnyUsername())
}
