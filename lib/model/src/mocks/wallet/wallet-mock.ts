import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import type { EvmAddress } from '@echo/model/types/evm-address'
import type { Wallet } from '@echo/model/types/wallet'
import { isNil, toLower } from 'ramda'

export function walletMockCrewAddress(): EvmAddress {
  return toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D')
}
export function walletMockJohnnyAddress(): EvmAddress {
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
