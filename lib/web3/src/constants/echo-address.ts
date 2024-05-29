import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'

export const ECHO_ADDRESS: Record<ChainName, HexString | undefined> = {
  blast: undefined,
  blast_sepolia: '0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c',
  ethereum: undefined,
  sepolia: '0xB0904D81440EFCA27Ec61948c95f21D7d546F8C3'
} as const
