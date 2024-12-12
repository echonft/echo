import { addressSchema } from '@echo/model/validators/address-schema'
import { seiAddressSchema } from '@echo/model/validators/sei-address-schema'
import { nullable, number, object, string } from 'zod'

export const palletNftResponseSchema = object({
  id: string(),
  image: nullable(string().url()),
  last_sale: nullable(
    object({
      denom: string(),
      amount: string()
    })
  ),
  last_sale_num: nullable(string()),
  top_offer: nullable(number()),
  name: string(),
  animation_url: nullable(string().url()),
  rank: nullable(number()),
  collection_info: object({
    name: string(),
    symbol: string(),
    creator_id: nullable(number()),
    description: nullable(string()),
    evm_address: addressSchema,
    sei_address: seiAddressSchema
  }),
  auction_info: nullable(object({})),
  immediate_reward_id: nullable(string()),
  deploy_env: string(),
  version: string().datetime()
})
