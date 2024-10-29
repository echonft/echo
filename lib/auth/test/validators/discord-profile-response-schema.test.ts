import { discordProfileResponseMock } from '@echo/auth/mocks/discord-profile-response-mock'
import type { DiscordProfileResponse } from '@echo/auth/types/discord-profile-response'
import { discordProfileResponseSchema } from '@echo/auth/validators/discord-profile-response-schema'
import { describe, expect, test } from '@jest/globals'
import { assoc } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('discordProfileResponseSchema', () => {
  const validResponse: Omit<DiscordProfileResponse, 'discriminator'> & Record<'discriminator', string> = assoc(
    'discriminator',
    '1',
    discordProfileResponseMock
  )

  test('invalid avatar fails', () => {
    expect(() => discordProfileResponseSchema.parse(assoc('avatar', 1, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['avatar'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('avatar', {}, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['avatar'],
          message: 'Expected string, received object'
        }
      ])
    )
  })

  test('invalid discriminator fails', () => {
    expect(() => discordProfileResponseSchema.parse(assoc('discriminator', undefined, validResponse))).toThrow()
    expect(() => discordProfileResponseSchema.parse(assoc('discriminator', {}, validResponse))).toThrow()
  })

  test('invalid global_name fails', () => {
    expect(() => discordProfileResponseSchema.parse(assoc('global_name', 1, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['global_name'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('global_name', {}, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['global_name'],
          message: 'Expected string, received object'
        }
      ])
    )
  })

  test('invalid id fails', () => {
    expect(() => discordProfileResponseSchema.parse(assoc('id', undefined, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['id'],
          message: 'Required'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('id', 1, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['id'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('id', {}, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['id'],
          message: 'Expected string, received object'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('id', '', validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: ['id']
        }
      ])
    )
  })

  test('invalid username fails', () => {
    expect(() => discordProfileResponseSchema.parse(assoc('username', undefined, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'undefined',
          path: ['username'],
          message: 'Required'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('username', 1, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'number',
          path: ['username'],
          message: 'Expected string, received number'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('username', {}, validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.invalid_type,
          expected: 'string',
          received: 'object',
          path: ['username'],
          message: 'Expected string, received object'
        }
      ])
    )
    expect(() => discordProfileResponseSchema.parse(assoc('username', '', validResponse))).toThrow(
      ZodError.create([
        {
          code: ZodIssueCode.too_small,
          minimum: 1,
          type: 'string',
          inclusive: true,
          exact: false,
          message: 'String must contain at least 1 character(s)',
          path: ['username']
        }
      ])
    )
  })

  test('valid', () => {
    expect(discordProfileResponseSchema.parse(validResponse)).toStrictEqual(discordProfileResponseMock)
  })
})
