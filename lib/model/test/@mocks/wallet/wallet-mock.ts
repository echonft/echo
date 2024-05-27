import type { Wallet } from '@echo/model/types/wallet'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chain-names'
import { isNil, toLower } from 'ramda'

export const WALLET_MOCK_CREW_ADDRESS = toLower('0xf672715f2bA85794659a7150e8C21F8d157bFe1D')
export const WALLET_MOCK_JOHNNY_ADDRESS = toLower('0x1e3918Dd44F427F056be6c8E132cf1b5f42dE59e')

export function getWalletMockByUsername(username: string) {
  const walletMock: Record<string, Wallet> = {
    crewnft_: {
      chain: CHAIN_ETHEREUM,
      address: WALLET_MOCK_CREW_ADDRESS
    },
    johnnycagewins: {
      chain: CHAIN_ETHEREUM,
      address: WALLET_MOCK_JOHNNY_ADDRESS
    }
  }

  const mock = walletMock[username]
  if (isNil(mock)) {
    throw Error(`wrong wallet mock username: ${username}`)
  }
  return mock
}

export function getWalletMock(): Wallet {
  return getWalletMockByUsername(USER_MOCK_JOHNNY_USERNAME)
}
