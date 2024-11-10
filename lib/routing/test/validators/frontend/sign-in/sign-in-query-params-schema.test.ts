import { baseUrl } from '@echo/routing/helpers/base-url'
import { signInQueryParamsSchema } from '@echo/routing/validators/frontend/sign-in/sign-in-query-params-schema'
import { describe, expect, test } from '@jest/globals'
import { map, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('signInQueryParamsSchema', () => {
  function expectZodError(data: unknown, path: (string | number | undefined)[]) {
    expect(() => signInQueryParamsSchema.parse(data)).toThrow()
    try {
      signInQueryParamsSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  test('invalid', () => {
    expectZodError({}, ['callbackUrl'])
    expectZodError(undefined, [])
    expectZodError({ callbackUrl: '' }, ['callbackUrl'])
    expectZodError({ callbackUrl: undefined }, ['callbackUrl'])
    expectZodError({ callbackUrl: '/valid/path' }, ['callbackUrl'])
    expectZodError({ callbackUrl: 'http://invalidbase.url/valid/path' }, ['callbackUrl'])
  })

  test('valid', () => {
    const valid = { callbackUrl: `${baseUrl()}/valid/path` }
    expect(signInQueryParamsSchema.parse(valid)).toStrictEqual(valid)
  })
})
