import { discordProfileSchema } from '@echo/backend/validators/discord-profile-schema'
import { describe, expect, test } from '@jest/globals'
import type { DiscordProfile } from 'next-auth/providers/discord'
import { assoc, map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('discordProfileSchema', () => {
  const validProviderProfile: Partial<DiscordProfile> = {
    avatar: 'avatar',
    global_name: 'global-name',
    discriminator: '1',
    id: 'discord-id',
    username: 'discord-username'
  }

  function expectZodError(data: unknown, path: (string | number)[]) {
    expect(() => discordProfileSchema.parse(data)).toThrow()
    try {
      discordProfileSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  test('invalid avatar fails', () => {
    expectZodError(assoc('avatar', 1, validProviderProfile), ['avatar'])
    expectZodError(assoc('avatar', {}, validProviderProfile), ['avatar'])
  })

  test('invalid discriminator fails', () => {
    expectZodError(assoc('discriminator', undefined, validProviderProfile), ['discriminator'])
    expectZodError(assoc('discriminator', {}, validProviderProfile), ['discriminator'])
  })

  test('invalid global_name fails', () => {
    expectZodError(assoc('global_name', 1, validProviderProfile), ['global_name'])
    expectZodError(assoc('global_name', {}, validProviderProfile), ['global_name'])
  })

  test('invalid id fails', () => {
    expectZodError(assoc('id', undefined, validProviderProfile), ['id'])
    expectZodError(assoc('id', 1, validProviderProfile), ['id'])
    expectZodError(assoc('id', {}, validProviderProfile), ['id'])
    expectZodError(assoc('id', '', validProviderProfile), ['id'])
  })

  test('invalid username fails', () => {
    expectZodError(assoc('username', undefined, validProviderProfile), ['username'])
    expectZodError(assoc('username', 1, validProviderProfile), ['username'])
    expectZodError(assoc('username', {}, validProviderProfile), ['username'])
    expectZodError(assoc('username', '', validProviderProfile), ['username'])
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
