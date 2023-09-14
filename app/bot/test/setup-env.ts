import { afterEach, beforeEach, jest } from '@jest/globals'

let replacedEnv: jest.Replaced<typeof process.env> | undefined = undefined

beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, BASE_URL: 'https://echonft.xyz' })
})

afterEach(() => {
  replacedEnv?.restore()
})
