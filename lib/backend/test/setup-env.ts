import { afterEach, beforeEach, jest } from '@jest/globals'

let replacedEnv: ReturnType<typeof jest.replaceProperty>
beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', {
    ...process.env,
    NEXT_PUBLIC_IS_TESTNET: '1'
  })
})

afterEach(() => {
  replacedEnv.restore()
})
