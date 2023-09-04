import { assertUser } from '../../../src/lib/server/helpers/user/assert-user'
import { assertUserHasWallets } from '../../../src/lib/server/helpers/user/assert-user-has-wallets'
import { User } from '@echo/firestore-types'

describe('helpers - user - assertUserHasWallets', () => {
  it('throws if user is does not have wallets', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => assertUserHasWallets({ id: 'userId', wallets: [] } as User)).toThrow()
  })
  it('does not throw if user has at least one wallet', () => {
    expect(() => assertUser({ id: 'userId', wallets: [{ address: '0x0', chainId: 1 }] } as User)).not.toThrow()
  })
})
