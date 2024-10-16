import { toSlug } from '@echo/model/helpers/to-slug'
import type { Collection } from '@echo/model/types/collection/collection'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { slugSchema } from '@echo/model/validators/slug-schema'
import type { CollectionResponse } from '@echo/nft-scan/types/response/collection-response'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { Nullable } from '@echo/utils/types/nullable'
import { evmAddressSchema } from '@echo/utils/validators/evm-address-schema'
import { applySpec, assoc, F, ifElse, objOf, pipe, prop } from 'ramda'
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
    banner_url: string().nullable().transform(unlessNil(removeQueryFromUrl)),
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
          pipe<[CollectionResponse], string, string>(prop('name'), toSlug),
          nonNullableReturn(prop('opensea_slug'))
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
