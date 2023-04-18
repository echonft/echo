import { address } from './address'
import { chainId } from './chain-id'
import { z } from 'zod'

export const wallet = z.object({
  chainId: chainId,
  address: address
})
