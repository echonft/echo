// TODO Add address for prod
import type { HexString } from '@echo/utils/types/hex-string'
import { getAddress } from 'viem'
import { sepolia } from 'viem/chains'

export const echoAddress: HexString = getAddress('0x2837Ad78E15B9280f522C91C5f5D75a3A2f9f76e', sepolia.id)
