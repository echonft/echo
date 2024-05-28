import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import type { ExtractAbiEvent } from 'abitype'

export type OfferExecutedAbiEvent = ExtractAbiEvent<typeof ECHO_ABI, 'OfferExecuted'>
