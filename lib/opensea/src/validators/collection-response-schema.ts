import type { Collection } from '@echo/model/types/collection'
import { emptyStringToUndefined } from '@echo/opensea/helpers/empty-string-to-undefined'
import type { CollectionContract } from '@echo/opensea/types/response/collection-response'
import { removeSpecialCharacters } from '@echo/utils/fp/remove-special-characters'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { always, applySpec, assoc, chain, F, find, ifElse, isEmpty, isNil, pipe, prop, propEq } from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

interface CollectionResponseSchemaArgs {
  chain?: ChainName
  logger?: Nullable<Logger>
}

export const collectionContractSchema = object({
  address: evmAddressSchema,
  chain: string()
})
export function collectionResponseSchema(args?: CollectionResponseSchemaArgs) {
  // uncomment fields if needed
  const schema = object({
    collection: string().toLowerCase().transform(removeSpecialCharacters),
    name: string(),
    description: string().nullable().optional().transform(emptyStringToUndefined),
    image_url: string()
      .or(string().url())
      .nullable()
      .optional()
      .transform(pipe(emptyStringToUndefined, removeQueryFromUrl)),
    banner_image_url: string()
      .or(string().url())
      .nullable()
      .optional()
      .transform(pipe(emptyStringToUndefined, removeQueryFromUrl)),
    owner: string(),
    safelist_status: nativeEnum({
      notRequested: 'not_requested',
      requested: 'requested',
      approved: 'approved',
      verified: 'verified',
      disabledTopTrending: 'disabled_top_trending'
    }),
    category: string(),
    is_disabled: boolean(),
    is_nsfw: boolean(),
    // trait_offers_enabled: boolean(),
    // collection_offers_enabled: boolean(),
    opensea_url: string().url(),
    project_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
    // wiki_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
    discord_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
    // telegram_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
    twitter_username: string().nullable().optional().transform(emptyStringToUndefined),
    instagram_username: string().nullable().optional().transform(emptyStringToUndefined),
    contracts: collectionContractSchema.array(),
    // editors: evmAddressSchema.array(),
    // fees: object({
    //   fee: number(),
    //   recipient: evmAddressSchema,
    //   required: boolean().nullable().optional()
    // }).array(),
    // required_zone: string().nullable().optional(),
    // rarity: object({
    //   strategy_version: string(),
    //   calculated_at: string().datetime().nullable().optional(),
    //   max_rank: number(),
    //   total_supply: number()
    // })
    //   .nullable()
    //   .optional(),
    // payment_tokens: object({
    //   symbol: string(),
    //   address: evmAddressSchema,
    //   chain: string(),
    //   image: string().url(),
    //   name: string(),
    //   decimals: number(),
    //   eth_price: string(),
    //   usd_price: string()
    // })
    //   .array()
    //   .nullable()
    //   .optional(),
    total_supply: number().nullable().optional()
    // created_date: string().date()
  })

  function transform(args?: CollectionResponseSchemaArgs) {
    return function (response: typeof schema._output) {
      const contract =
        isNil(args) || isNil(args.chain)
          ? undefined
          : pipe<[typeof schema._output], CollectionContract[], CollectionContract | undefined>(
              prop('contracts'),
              ifElse(isEmpty, always(undefined), find<CollectionContract>(propEq(args.chain as string, 'chain')))
            )(response)
      if (!isNil(args?.chain) && isNil(contract)) {
        args.logger?.info({ fn: collectionResponseSchema.name, response, chain }, 'no contract found for chain')
        return undefined
      }
      return applySpec<Collection>({
        bannerUrl: prop('banner_image_url'),
        contract: prop('contract'),
        description: prop('description'),
        discordUrl: prop('discord_url'),
        name: prop('name'),
        profilePictureUrl: prop('image_url'),
        slug: prop('collection'),
        totalSupply: prop('total_supply'),
        verified: F
      })(assoc('contract', contract, response))
    }
  }
  return schema.transform(transform(args))
}
