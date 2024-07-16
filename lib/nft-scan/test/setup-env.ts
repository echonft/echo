import { afterEach, beforeEach, jest } from '@jest/globals'

let replacedEnv: ReturnType<typeof jest.replaceProperty>
beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', {
    ...process.env,
    NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL: 'dev.echonft.xyz'
  })
})

afterEach(() => {
  replacedEnv.restore()
})
