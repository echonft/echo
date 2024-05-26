import { always, equals, ifElse, isNil, pipe } from 'ramda'

export const isTestnet: boolean = pipe<['1' | undefined], boolean>(ifElse(isNil, always(false), equals('1')))(
  process.env.TESTNET
)
