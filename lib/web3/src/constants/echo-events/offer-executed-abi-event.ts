import { echoAbi } from '@echo/web3/constants/echo-abi'
import type { ExtractAbiEvent } from 'abitype'

export type OfferExecutedAbiEvent = ExtractAbiEvent<typeof echoAbi, 'OfferExecuted'>
