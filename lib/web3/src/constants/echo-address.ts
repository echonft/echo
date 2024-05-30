import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { formatAddress } from '@echo/web3/helpers/format-address'

export const ECHO_ADDRESS: Record<ChainName, HexString | undefined> = {
  blast: formatAddress('0x538dd3e75d05b63dc81fee587b8a4aa5fde2cc95'),
  blast_sepolia: formatAddress('0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c'),
  ethereum: undefined,
  sepolia: formatAddress('0xB0904D81440EFCA27Ec61948c95f21D7d546F8C3')
} as const
