import type { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import type { ExtractAbiEventNames } from 'abitype'

export type EchoAbiEventNames = ExtractAbiEventNames<typeof ECHO_ABI>
