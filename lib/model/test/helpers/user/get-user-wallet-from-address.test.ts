import { getUserWalletFromAddress } from '@echo/model/helpers/user/get-user-wallet-from-address'
import { authUserMock } from '@echo/model-mocks/auth-user/auth-user-mock'
import { toLower } from 'ramda'

describe('helpers - user - getUserWalletFromAddress', () => {
  it('should return the wallet if the address matches', () => {
    const user = authUserMock
    const address = toLower('0x1E3918dD44F427F056be6C8E132cF1b5F42de59E')

    expect(getUserWalletFromAddress(user, address)).toStrictEqual(user.wallets[0])
  })

  it('should return undefined if the address does not match', () => {
    const user = authUserMock
    const address = '0x0000000000'

    expect(getUserWalletFromAddress(user, address)).toBeUndefined()
  })
})
