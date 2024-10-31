import { baseUrl } from '@echo/routing/helpers/base-url'
import { Path } from '@echo/routing/path/path'
import { describe, expect, test } from '@jest/globals'

describe('path', () => {
  describe('path !params !query-params', () => {
    const pathString = '/this/is/a/path'
    const path = new Path({ path: pathString, secure: false })

    test('get', () => {
      expect(path.get()).toBe(pathString)
    })

    test('getUrl', () => {
      expect(path.getUrl()).toBe(`${baseUrl}${pathString}`)
    })

    test('test(...)', () => {
      expect(path.test('/this/is/not/a/path')).toBeFalsy()
      expect(path.test('/this/is/')).toBeFalsy()
      expect(path.test(pathString)).toBeTruthy()
      expect(path.test(`${pathString}/`)).toBeTruthy()
    })
  })

  describe('path params !query-params', () => {
    const path = new Path<{ param1: string; param2: string }>({ path: '/path/:param1/:param2', secure: false })

    test('get', () => {
      expect(path.get({ param1: '1', param2: '2' })).toBe('/path/1/2')
    })

    test('getUrl', () => {
      expect(path.getUrl({ param1: '1', param2: '2' })).toBe(`${baseUrl}/path/1/2`)
    })

    test('test(...)', () => {
      expect(path.test('/path/1')).toBeFalsy()
      expect(path.test('/path/1/')).toBeFalsy()
      expect(path.test('/path/1/2')).toBeTruthy()
      expect(path.test('/path/1/2/')).toBeTruthy()
    })
  })

  describe('path !params query-params', () => {
    const path = new Path<never, { param1: string; param2: string }>({ path: '/my/path', secure: false })

    test('get', () => {
      expect(path.get()).toBe('/my/path')
    })

    test('getUrl', () => {
      expect(path.getUrl()).toBe(`${baseUrl}/my/path`)
    })

    test('get with query', () => {
      expect(path.withQuery({ param1: '1', param2: '2' }).get()).toBe('/my/path?param1=1&param2=2')
    })

    test('getUrl with query', () => {
      expect(path.withQuery({ param1: '1', param2: '2' }).getUrl()).toBe(`${baseUrl}/my/path?param1=1&param2=2`)
    })

    test('test(...)', () => {
      expect(path.test('/my/path/:param1/:param2')).toBeFalsy()
      expect(path.test('/my/path/1/2')).toBeFalsy()
      expect(path.test('/my/path?whatever=1')).toBeTruthy()
      expect(path.test('/my/path?param=1')).toBeTruthy()
      expect(path.test('/my/path?param=1&param2=2')).toBeTruthy()
      expect(path.test('/my/path')).toBeTruthy()
      expect(path.test('/my/path/')).toBeTruthy()
    })
  })

  describe('path params query-params', () => {
    const path = new Path<{ param1: string; param2: string }, { param3: string }>({
      path: '/my/path/:param1/:param2',
      secure: false
    })

    test('get', () => {
      expect(path.get({ param1: '1', param2: '2' })).toBe('/my/path/1/2')
    })

    test('getUrl', () => {
      expect(path.getUrl({ param1: '1', param2: '2' })).toBe(`${baseUrl}/my/path/1/2`)
    })

    test('get with query', () => {
      expect(path.withQuery({ param3: '3' }).get({ param1: '1', param2: '2' })).toBe('/my/path/1/2?param3=3')
    })

    test('getUrl with query', () => {
      expect(path.withQuery({ param3: '3' }).getUrl({ param1: '1', param2: '2' })).toBe(
        `${baseUrl}/my/path/1/2?param3=3`
      )
    })

    test('test(...)', () => {
      expect(path.test('/not/my/path/1/2')).toBeFalsy()
      expect(path.test('/my/not/path/1/2')).toBeFalsy()
      expect(path.test('/my/path/1')).toBeFalsy()
      expect(path.test('/my/path/1/2?whatever=1')).toBeTruthy()
      expect(path.test('/my/path/1/2?param=3')).toBeTruthy()
      expect(path.test('/my/path/1/2')).toBeTruthy()
      expect(path.test('/my/path/1/2/')).toBeTruthy()
    })
  })
})
