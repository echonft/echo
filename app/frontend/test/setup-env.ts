let replacedEnv: jest.ReplaceProperty<typeof process.env> | undefined = undefined

beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', {
    ...process.env,
    TESTNET: '1'
  })
})

afterEach(() => {
  replacedEnv?.restore()
})
