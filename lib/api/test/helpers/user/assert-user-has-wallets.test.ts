import { assertUser } from '../../../src/helpers/user/assert-user'
import { assertUserHasWallets } from '../../../src/helpers/user/assert-user-has-wallets'
import { User } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

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
