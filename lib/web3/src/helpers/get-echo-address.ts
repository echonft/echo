import type { EvmAddress } from '@echo/model/types/evm-address'
import type { ChainName } from '@echo/utils/types/chain-name'
import { toLower } from 'ramda'

export function getEchoAddress(chain: ChainName): EvmAddress {
  switch (chain) {
    case 'blast':
      return toLower('0x538dd3e75d05b63dc81fee587b8a4aa5fde2cc95')
    case 'blast_sepolia':
      return toLower('0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c')
    case 'ethereum':
      throw Error(`unsupported chain: ${chain}`)
    case 'sepolia':
      return toLower('0xB0904D81440EFCA27Ec61948c95f21D7d546F8C3')
    case 'sei':
      // FIXME wrong address
      return toLower('0x538dd3e75d05b63dc81fee587b8a4aa5fde2cc95')
  }
}
