import { afterEach, beforeEach, jest } from '@jest/globals'

let replacedEnv: jest.Replaced<typeof process.env> | undefined = undefined

beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', { ...process.env, VERCEL_URL: 'echonft.xyz' })
})

afterEach(() => {
  replacedEnv?.restore()
})
