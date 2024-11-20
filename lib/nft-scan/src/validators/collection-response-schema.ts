import type { Collection } from '@echo/model/types/collection'
import { addressSchema } from '@echo/model/validators/address-schema'
import { nftTokenTypeSchema } from '@echo/model/validators/nft-token-type-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import { removeQueryFromUrl } from '@echo/utils/helpers/remove-query-from-url'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { applySpec, assoc, dissoc, objOf, pipe, prop, when } from 'ramda'
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
  twitter: string().nullable(),
  website: string().nullable()
})

export const collectionResponseSchema = baseCollectionResponseSchema.transform<
  Record<'collection', Nullable<Collection>> & Record<'isSpam', boolean>
>((data) => {
  if (data.is_spam) {
    return { collection: undefined as Nullable<Collection>, isSpam: true }
  }
  return pipe<
    [typeof data],
    Collection,
    Collection,
    Record<'collection', Nullable<Collection>>,
    Record<'collection', Nullable<Collection>> & Record<'isSpam', boolean>
  >(
    applySpec<Collection>({
      contract: prop('contract_address'),
      description: pipe(prop('description'), removeNullOrEmptyString),
      discordUrl: pipe(prop('discord'), removeNullOrEmptyString),
      name: prop('name'),
      pictureUrl: pipe(prop('logo_url'), removeNullOrEmptyString),
      slug: prop('contract_address'),
      totalSupply: prop('items_total'),
      twitterUsername: pipe(prop('twitter'), removeNullOrEmptyString),
      type: prop('erc_type'),
      websiteUrl: pipe(prop('website'), removeNullOrEmptyString)
    }),
    pipe(
      when<Collection, Collection>(propIsNil('description'), dissoc('description')),
      when<Collection, Collection>(propIsNil('discordUrl'), dissoc('discordUrl')),
      when<Collection, Collection>(propIsNil('pictureUrl'), dissoc('pictureUrl')),
      when<Collection, Collection>(propIsNil('twitterUsername'), dissoc('twitterUsername')),
      when<Collection, Collection>(propIsNil('websiteUrl'), dissoc('websiteUrl'))
    ),
    objOf('collection'),
    assoc('isSpam', false)
  )(data)
})
