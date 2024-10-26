import { Chain } from '@echo/model/constants/chain'
import { ChainError } from '@echo/model/constants/errors/chain-error'
import type { EvmAddress } from '@echo/model/types/address'
import { toLower } from 'ramda'

export function getEchoAddress(chain: Chain): EvmAddress {
  switch (chain) {
    case Chain.Blast:
      return toLower('0x538dd3e75d05b63dc81fee587b8a4aa5fde2cc95')
    case Chain.BlastSepolia:
      return toLower('0xf37c2c531a6ffebb8d3edcf34e54b0e26047da4c')
    case Chain.Ethereum:
      throw Error(ChainError.Unsupported)
    case Chain.Sepolia:
      return toLower('0xB0904D81440EFCA27Ec61948c95f21D7d546F8C3')
    case Chain.Sei:
      // FIXME wrong address
      return toLower('0x538dd3e75d05b63dc81fee587b8a4aa5fde2cc95')
  }
}
