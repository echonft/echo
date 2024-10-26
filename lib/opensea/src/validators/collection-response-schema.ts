import type { Chain } from '@echo/model/constants/chain'
import type { Collection } from '@echo/model/types/collection'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { emptyStringToUndefined } from '@echo/opensea/helpers/empty-string-to-undefined'
import { warn } from '@echo/opensea/helpers/logger'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { always, applySpec, assoc, F, find, ifElse, isEmpty, isNil, pipe, prop, propEq } from 'ramda'
import { boolean, nativeEnum, number, object, string } from 'zod'

export const collectionContractSchema = object({
  address: evmAddressSchema,
  chain: string()
})

export function collectionResponseSchema(chain: Chain) {
  return object({
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
  }).transform((response) => {
    const contract = pipe(prop('contracts'), ifElse(isEmpty, always(undefined), find(propEq(chain, 'chain'))))(response)
    if (isNil(contract)) {
      warn({ response, chain }, 'no contract found for chain')
      return undefined
    }
    return applySpec<Omit<Collection, 'type'>>({
      contract: prop('contract'),
      description: prop('description'),
      discordUrl: prop('discord_url'),
      name: prop('name'),
      pictureUrl: prop('image_url'),
      slug: prop('collection'),
      totalSupply: prop('total_supply'),
      verified: F
    })(assoc('contract', contract, response))
  })
}
