import { toSlug } from '@echo/model/helpers/to-slug'
import type { Collection } from '@echo/model/types/collection'
import type { Slug } from '@echo/model/types/slug'
import { addressSchema } from '@echo/model/validators/address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { applySpec, assoc, F, ifElse, objOf, pipe, prop } from 'ramda'
import { boolean, number, object, string } from 'zod'

function removeNullOrEmptyString(value: string | null): string | undefined {
  if (isNilOrEmpty(value)) {
    return undefined
  }
  return value
}

export const baseCollectionResponseSchema = object({
  contract_address: addressSchema,
  description: string().nullable(),
  discord: string().nullable(),
  erc_type: nftTokenTypeSchema,
  is_spam: boolean(),
  items_total: number(),
  logo_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
  name: string(),
  opensea_slug: string().nullable(),
  twitter: string().nullable(),
  website: string().nullable()
})

export const collectionResponseSchema = baseCollectionResponseSchema
  .omit({ opensea_slug: true })
  .extend({
    opensea_slug: slugSchema.nullable()
  })
  .transform((data) => {
    if (data.is_spam) {
      return { collection: undefined as Nullable<Collection>, isSpam: true }
    }
    return pipe(
      applySpec<Collection>({
        contract: prop('contract_address'),
        description: pipe(prop('description'), removeNullOrEmptyString),
        discordUrl: pipe(prop('discord'), removeNullOrEmptyString),
        name: prop('name'),
        pictureUrl: pipe(prop('logo_url'), removeNullOrEmptyString),
        slug: ifElse<
          Record<'name', string> & Record<'opensea_slug', Nullable<Slug>>,
          Record<'name', string> & Record<'opensea_slug', Slug>,
          Slug,
          Slug
        >(
          propIsNotNil('opensea_slug'),
          prop('opensea_slug'),
          pipe<[Record<'name', string>], string, Slug>(prop('name'), toSlug)
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
