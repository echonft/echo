import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { getAbiItem } from 'viem'

export const offerExecutedEvent = getAbiItem({ abi: ECHO_ABI, name: 'OfferExecuted' })
