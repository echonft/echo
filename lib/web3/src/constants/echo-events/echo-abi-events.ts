import type { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import type { ExtractAbiEvents } from 'abitype'

export type EchoAbiEvents = ExtractAbiEvents<typeof ECHO_ABI>
