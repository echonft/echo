import type { Collection } from '@echo/model/types/collection/collection'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { emptyStringToUndefined } from '@echo/opensea/helpers/empty-string-to-undefined'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { Chain } from '@echo/utils/constants/chain'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { always, applySpec, assoc, chain, F, find, ifElse, isEmpty, isNil, pipe, prop, propEq } from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

type CollectionContract = ReturnType<typeof collectionContractSchema.parse>

interface CollectionResponseSchemaArgs {
  chain?: Chain
  logger?: Nullable<Logger>
}

export const collectionContractSchema = object({
  address: evmAddressSchema,
  chain: string()
})
export function collectionResponseSchema(args?: CollectionResponseSchemaArgs) {
  const schema = object({
    collection: slugSchema,
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
    opensea_url: string().url(),
    project_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
    discord_url: string().or(string().url()).nullable().optional().transform(emptyStringToUndefined),
    twitter_username: string().nullable().optional().transform(emptyStringToUndefined),
    instagram_username: string().nullable().optional().transform(emptyStringToUndefined),
    contracts: collectionContractSchema.array(),
    total_supply: number().nullable().optional()
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
        args.logger?.info({ schema: collectionResponseSchema.name, response, chain }, 'no contract found for chain')
        return undefined
      }
      return applySpec<Omit<Collection, 'type'>>({
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
