import type { AuthUser } from '@echo/auth/types/auth-user'
import { authUserSchema } from '@echo/auth/validators/auth-user-schema'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { walletMockCrew, walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { describe, expect, test } from '@jest/globals'
import { assoc, dissoc } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('authUserSchema', () => {
  const validAuthUser: AuthUser = {
    ...userMockJohnny,
    wallets: [walletMockJohnny]
  }
  test('invalid', () => {
    expect(() => authUserSchema.parse(dissoc('wallets', validAuthUser))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'array',
          received: 'undefined',
          path: ['wallets'],
          message: 'Required'
        }
      ])
    )
    expect(() => authUserSchema.parse(assoc('wallets', validAuthUser, walletMockJohnny))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'undefined',
          path: ['discord'],
          message: 'Required'
        },
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['username'],
          message: 'Required'
        },
        {
          code: ZodIssueCode.invalid_type,
          expected: 'array',
          received: 'object',
          path: ['wallets'],
          message: 'Expected array, received object'
        }
      ])
    )
    expect(() => authUserSchema.parse(assoc('wallets', validAuthUser, {}))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'object',
          received: 'undefined',
          path: ['discord'],
          message: 'Required'
        },
        {
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
          path: ['username'],
          message: 'Required'
        },
        {
          code: 'invalid_type',
          expected: 'array',
          received: 'object',
          path: ['wallets'],
          message: 'Expected array, received object'
        }
      ])
    )
  })

  test('valid', () => {
    expect(authUserSchema.parse(validAuthUser)).toStrictEqual(validAuthUser)
    const multipleWalletsValidAuthUser: AuthUser = assoc(
      'wallets',
      [walletMockJohnny, walletMockJohnny, walletMockJohnny, walletMockCrew],
      validAuthUser
    )
    expect(authUserSchema.parse(multipleWalletsValidAuthUser)).toStrictEqual(multipleWalletsValidAuthUser)
    const noWalletValidAuthUser: AuthUser = assoc('wallets', [], validAuthUser)
    expect(authUserSchema.parse(noWalletValidAuthUser)).toStrictEqual(noWalletValidAuthUser)
  })
})
