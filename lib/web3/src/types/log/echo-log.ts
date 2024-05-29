import type { EchoAbiEvents } from '@echo/web3/constants/echo-events/echo-abi-events'
import type { Log } from 'viem'

export type EchoLog = Log<bigint, number, false, EchoAbiEvents>
