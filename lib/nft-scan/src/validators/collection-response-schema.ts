import type { Chain } from '@echo/model/constants/chain'
import { toSlug } from '@echo/model/helpers/to-slug'
import type { Collection } from '@echo/model/types/collection'
import { evmAddressSchema } from '@echo/model/validators/evm-address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { applySpec, assoc, F, ifElse, objOf, pipe, prop } from 'ramda'
import { boolean, number, object, string } from 'zod'

export function collectionResponseSchema(chain: Chain) {
  function removeNullOrEmptyString(value: string | null): string | undefined {
    if (isNilOrEmpty(value)) {
      return undefined
    }
    return value
  }

  return object({
    contract_address: evmAddressSchema,
    description: string().nullable(),
    discord: string().nullable(),
    erc_type: nftTokenTypeSchema,
    is_spam: boolean(),
    items_total: number(),
    logo_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
    name: string(),
    opensea_slug: slugSchema.nullable(),
    twitter: string().nullable(),
    website: string().nullable()
  }).transform((data) => {
    if (data.is_spam) {
      return { collection: undefined, isSpam: true }
    }
    return pipe(
      applySpec<Collection>({
        contract: pipe(prop('contract_address'), objOf('address'), assoc('chain', chain)),
        description: pipe(prop('description'), removeNullOrEmptyString),
        discordUrl: pipe(prop('discord'), removeNullOrEmptyString),
        name: prop('name'),
        pictureUrl: pipe(prop('logo_url'), removeNullOrEmptyString),
        slug: ifElse<[CollectionResponse], string, string>(
          propIsNil('opensea_slug'),
          pipe<[CollectionResponse], string, string>(prop('name'), toSlug),
          prop('opensea_slug') as (response: CollectionResponse) => string
        ),
        totalSupply: prop('items_total'),
        twitterUsername: pipe(prop('twitter'), removeNullOrEmptyString),
        type: prop('erc_type'),
        websiteUrl: pipe(prop('website'), removeNullOrEmptyString),
        verified: F
      }),
      objOf('collection'),
      assoc('isSpam', false)
    )(data)
  })
}
