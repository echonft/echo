import { userHasWallet } from '@echo/model/helpers/user/user-has-wallet'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { Wallet } from '@echo/model/types/wallet'
import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { toLower } from 'ramda'

describe('helpers - user - userHasWallet', () => {
  it('should return true if the user has the given wallet', () => {
    const user = authUserMock
    const wallet: Wallet = {
      chainId: 1,
      address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
    }

    expect(userHasWallet(user, wallet)).toBeTruthy()
  })

  it('should return false if the user does not have the given wallet', () => {
    const user = authUserMock
    const wallet: Wallet = {
      chainId: 1,
      address: toLower('0xtest-address')
    }

    expect(userHasWallet(user, wallet)).toBeFalsy()
  })

  it('should return false if the user does not have any wallets', () => {
    const user: AuthUser = {
      ...authUserMock,
      wallets: []
    }
    const wallet: Wallet = {
      chainId: 1,
      address: toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')
    }

    expect(userHasWallet(user, wallet)).toBeFalsy()
  })
})
