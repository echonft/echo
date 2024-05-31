import { afterEach, beforeEach, jest } from '@jest/globals'

let replacedEnv: jest.Replaced<typeof process.env> | undefined = undefined

beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', {
    ...process.env,
    NFT_SCAN_API_KEY: 'test'
  })
})

afterEach(() => {
  replacedEnv?.restore()
})
