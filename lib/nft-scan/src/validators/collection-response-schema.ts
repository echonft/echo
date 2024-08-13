import type { Collection } from '@echo/model/types/collection'
import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { removeSpecialCharacters } from '@echo/utils/fp/remove-special-characters'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { nftTokenTypeSchema } from '@echo/utils/validators/nft-token-type-schema'
import { applySpec, assoc, F, ifElse, objOf, pipe, prop, replace, toLower } from 'ramda'
import { boolean, number, object, string } from 'zod'

export interface CollectionResponseSchemaReturn {
  collection: Nullable<Collection>
  isSpam: boolean
}

export function collectionResponseSchema(chain: ChainName) {
  function removeNullOrEmptyString(value: string | null): string | undefined {
    if (isNilOrEmpty(value)) {
      return undefined
    }
    return value
  }

  const schema = object({
    // amounts_total: number(),
    // attributes: collectionAttributesResponseSchema.array().nullable().optional(),
    banner_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
    // collections_with_same_name: string().array(),
    contract_address: evmAddressSchema,
    // deploy_block_number: number(),
    description: string().nullable(),
    discord: string().nullable(),
    // email: string().nullable(),
    erc_type: nftTokenTypeSchema,
    // featured_url: string().nullable(),
    // floor_price: number().nullable(),
    // github: string().nullable(),
    // instagram: string().nullable(),
    is_spam: boolean(),
    items_total: number(),
    // large_image_url: string().nullable(),
    logo_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
    // medium: string().nullable(),
    name: string(),
    // opensea_floor_price: number().nullable(),
    opensea_slug: string().nullable(),
    // opensea_verified: boolean(),
    // owner: evmAddressSchema.nullable(),
    // owners_total: number(),
    // price_symbol: string(),
    // royalty: number().nullable(),
    // symbol: string(),
    // telegram: string().nullable(),
    twitter: string().nullable(),
    // verified: boolean(),
    website: string().nullable()
  })
  return schema.transform<CollectionResponseSchemaReturn>((data) => {
    if (data.is_spam) {
      return { collection: undefined, isSpam: true }
    }
    return pipe(
      applySpec<Collection>({
        bannerUrl: pipe(prop('banner_url'), removeNullOrEmptyString),
        contract: pipe(prop('contract_address'), objOf('address'), assoc('chain', chain)),
        description: pipe(prop('description'), removeNullOrEmptyString),
        discordUrl: pipe(prop('discord'), removeNullOrEmptyString),
        name: prop('name'),
        profilePictureUrl: pipe(prop('logo_url'), removeNullOrEmptyString),
        slug: ifElse<[CollectionResponse], string, string>(
          propIsNil('opensea_slug'),
          pipe<[CollectionResponse], string, string, string, string>(
            prop('name'),
            toLower,
            replace(/\s+/g, '-'),
            removeSpecialCharacters
          ),
          pipe(nonNullableReturn(prop('opensea_slug')), toLower, removeSpecialCharacters)
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
