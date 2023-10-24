// TODO Add address for prod
import type { HexString } from '@echo/utils/types/hex-string'
import { getAddress } from 'viem'
import { sepolia } from 'viem/chains'

export const echoAddress: HexString = getAddress('0x07d31999C2BAe29086133A5C93b07a481c5dDaea', sepolia.id)
