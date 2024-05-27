import { CHAIN_ETHEREUM } from '@echo/utils/constants/chain-names'
import { shortenAddress } from '@echo/web3/helpers/shorten-address'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('helpers - shortenAddress', () => {
  it('address is shorten correctly', () => {
    expect(
      shortenAddress({ address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8'), chain: CHAIN_ETHEREUM })
    ).toBe('0xF48c...1ac8')
    expect(
      shortenAddress({ address: toLower('0x9e7343Ce1816a7fc21E1c46537F04050F97AfbD9'), chain: CHAIN_ETHEREUM })
    ).toBe('0x9e73...fbD9')
  })
})
