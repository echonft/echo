let replacedEnv: jest.ReplaceProperty<typeof process.env> | undefined = undefined

beforeEach(() => {
  replacedEnv = jest.replaceProperty(process, 'env', {
    ...process.env,
    NEXT_PUBLIC_CHAIN_ID: '11155111'
  })
})

afterEach(() => {
  replacedEnv?.restore()
})
