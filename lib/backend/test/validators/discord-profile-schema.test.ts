import { discordProfileSchema } from '@echo/backend/validators/discord-profile-schema'
import { describe, expect, test } from '@jest/globals'
import type { DiscordProfile } from 'next-auth/providers/discord'
import { assoc } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

describe('discordProfileSchema', () => {
  const validProviderProfile: Partial<DiscordProfile> = {
    avatar: 'avatar',
    global_name: 'global-name',
    discriminator: '1',
    id: 'discord-id',
    username: 'discord-username'
  }

  test('invalid avatar fails', () => {
    expect(() => discordProfileSchema.parse(assoc('avatar', 1, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('avatar', {}, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('discriminator', undefined, validProviderProfile))).toThrow()
    expect(() => discordProfileSchema.parse(assoc('discriminator', {}, validProviderProfile))).toThrow()
  })

  test('invalid global_name fails', () => {
    expect(() => discordProfileSchema.parse(assoc('global_name', 1, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('global_name', {}, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('id', undefined, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('id', 1, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('id', {}, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('id', '', validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('username', undefined, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('username', 1, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('username', {}, validProviderProfile))).toThrow(
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
    expect(() => discordProfileSchema.parse(assoc('username', '', validProviderProfile))).toThrow(
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
    expect(discordProfileSchema.parse(validProviderProfile)).toStrictEqual({
      discord: {
        avatarUrl: 'https://cdn.discordapp.com/avatars/discord-id/avatar.png',
        globalName: 'global-name',
        id: 'discord-id',
        username: 'discord-username'
      },
      username: 'discord-username'
    })
  })
})
