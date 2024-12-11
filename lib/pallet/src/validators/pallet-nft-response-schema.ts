import { addressSchema } from '@echo/model/validators/address-schema'
import { nullable, number, object, string } from 'zod'

export const palletNftResponseSchema = object({
  id: string(),
  image: nullable(string()),
  last_sale: nullable(
    object({
      denom: string(),
      amount: string()
    })
  ),
  last_sale_num: nullable(string()),
  top_offer: nullable(number()),
  name: string(),
  animation_url: nullable(string()),
  rank: nullable(number()),
  collection_info: object({
    name: string(),
    symbol: string(),
    creator_id: nullable(number()),
    description: nullable(string()),
    evm_address: addressSchema,
    sei_address: string()
  }),
  auction_info: nullable(object({})),
  immediate_reward_id: nullable(string()),
  deploy_env: string(),
  version: string()
})
