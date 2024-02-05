import { afterEach, beforeEach, jest } from '@jest/globals'

let replacedEnv: jest.Replaced<typeof process.env> | undefined = undefined

beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', {
    ...process.env,
    NEXT_PUBLIC_URL: 'http://localhost:3000'
  })
})

afterEach(() => {
  replacedEnv?.restore()
})
