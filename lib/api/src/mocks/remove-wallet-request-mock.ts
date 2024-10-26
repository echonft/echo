import type { RemoveWalletRequest } from '@echo/api/types/requests/remove-wallet-request'
import { Chain } from '@echo/model/constants/chain'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'

export const removeWalletRequestMock: RemoveWalletRequest = {
  address: walletMockCrew.address,
  chain: Chain.Blast
}
