import { userMockJohnny } from '@echo/model/mocks/user-mock'
import { userIndexSchema, userSchema } from '@echo/model/validators/user-schema'
import { describe, expect, it } from '@jest/globals'
import { assoc, assocPath, dissoc, map, pick, pipe, prop } from 'ramda'
import { ZodError } from 'zod'

describe('userSchema', () => {
  function expectZodError(data: unknown, path: (string | number)[]) {
    expect(() => userSchema.parse(data)).toThrow()
    try {
      userSchema.parse(data)
    } catch (err) {
      expect(err).toBeInstanceOf(ZodError)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(pipe(prop('issues'), map(prop('path')))(err as ZodError)).toContainEqual(path)
    }
  }

  it('invalid', () => {
    expectZodError(undefined, [])
    expectZodError('', [])
    expectZodError(1, [])
  })

  it('invalid when discord avatar url is not valid', () => {
    const path = ['discord', 'avatarUrl']
    expectZodError(assocPath(path, undefined, userMockJohnny), path)
    expectZodError(assocPath(path, '', userMockJohnny), path)
    expectZodError(assocPath(path, 1, userMockJohnny), path)
    expectZodError(assocPath(path, {}, userMockJohnny), path)
    expectZodError(assocPath(path, 'not-a-url', userMockJohnny), path)
    expectZodError(assocPath(path, 'not-a-url.com/path', userMockJohnny), path)
    expectZodError(assocPath(path, '/path/a/b/c', userMockJohnny), path)
    expectZodError(assocPath(path, 'path/a/b/c', userMockJohnny), path)
  })

  it('invalid when discord username is not valid', () => {
    const path = ['discord', 'username']
    expectZodError(assocPath(path, undefined, userMockJohnny), path)
    expectZodError(assocPath(path, '', userMockJohnny), path)
    expectZodError(assocPath(path, 1, userMockJohnny), path)
    expectZodError(assocPath(path, {}, userMockJohnny), path)
  })

  it('invalid when discord global name is not valid', () => {
    const path = ['discord', 'globalName']
    expectZodError(assocPath(path, {}, userMockJohnny), path)
  })

  it('invalid when wallet is missing or not valid', () => {
    const prop = 'wallet'
    const path = [prop]
    expectZodError(dissoc(prop, userMockJohnny), path)
    expectZodError(assoc(prop, {}, userMockJohnny), path)
    expectZodError(assoc(prop, undefined, userMockJohnny), path)
    expectZodError(assoc(prop, '', userMockJohnny), path)
  })

  it('valid without globalName', () => {
    expect(userSchema.parse(userMockJohnny)).toStrictEqual(userMockJohnny)
  })

  it('valid with globalName', () => {
    const userWithGlobalName = assocPath(['discord', 'globalName'], 'global-name', userMockJohnny)
    expect(userSchema.parse(userWithGlobalName)).toStrictEqual(userWithGlobalName)
  })

  describe('userIndexSchema', () => {
    it('only keeps index props', () => {
      expect(userIndexSchema.parse(userMockJohnny)).toStrictEqual(pick(['username'], userMockJohnny))
    })
  })
})
