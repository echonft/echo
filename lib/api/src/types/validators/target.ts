import { address } from './address'
import { chainId } from './chain-id'
import { z } from 'zod'

export const target = z.object({
  address: address,
  chainId: chainId
})
