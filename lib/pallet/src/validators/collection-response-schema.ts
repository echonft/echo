import type { Collection } from '@echo/model/types/collection'
import { addressSchema } from '@echo/model/validators/address-schema'
import { seiAddressSchema } from '@echo/model/validators/sei-address-schema'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { propIsNil } from '@echo/utils/helpers/prop-is-nil'
import { propIsNotNil } from '@echo/utils/helpers/prop-is-not-nil'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import { applySpec, dissoc, find, last, pipe, prop, unless, when } from 'ramda'
import { array, nullable, number, object, string } from 'zod'

function removeNullOrEmptyString(value: string | null): string | undefined {
  if (isNilOrEmpty(value)) {
    return undefined
  }
  return value
}

function extractTwitterUsername(url: string): string | undefined {
  try {
    const urlObj = new URL(url)
    return last(urlObj.pathname.split('/'))
  } catch {
    return undefined
  }
}

const creatorInfoSchema = object({
  domain: nullable(string()),
  pfp: nullable(string().url()),
  sei_address: seiAddressSchema,
  evm_address: nullable(addressSchema)
})

const socialSchema = object({
  twitter: string().optional(),
  discord: string().optional()
})

export const baseCollectionResponseSchema = object({
  sei_address: seiAddressSchema,
  evm_address: addressSchema,
  creator: seiAddressSchema,
  chain_id: string(),
  creator_info: creatorInfoSchema,
  name: string(),
  slug: string(),
  symbol: string(),
  description: nullable(string()),
  pfp: nullable(string().url()),
  banner: nullable(string().url()),
  socials: nullable(array(socialSchema)),
  supply: number(),
  owners: number(),
  auction_count: number(),
  floor: number(),
  volume: number(),
  num_sales_24hr: number(),
  volume_24hr: number()
})

export const collectionResponseSchema = baseCollectionResponseSchema.transform<Record<'collection', Collection>>(
  (data) => {
    return pipe(
      applySpec<Collection>({
        contract: prop('evm_address'),
        description: pipe(prop('description'), removeNullOrEmptyString),
        discordUrl: pipe(
          prop('socials'),
          unless(isNilOrEmpty, find(propIsNotNil('discord'))),
          unlessNil(prop('discord')),
          removeNullOrEmptyString
        ),
        name: prop('name'),
        pictureUrl: pipe(prop('pfp'), removeNullOrEmptyString),
        bannerUrl: pipe(prop('banner'), removeNullOrEmptyString),
        slug: prop('slug'),
        totalSupply: prop('supply'),
        twitterUsername: pipe(
          prop('socials'),
          unless(isNilOrEmpty, find(propIsNotNil('twitter'))),
          unlessNil(prop('twitter')),
          extractTwitterUsername,
          removeNullOrEmptyString
        ),
        seiAddress: prop('sei_address')
      }),
      pipe(
        when<Collection, Collection>(propIsNil('description'), dissoc('description')),
        when<Collection, Collection>(propIsNil('discordUrl'), dissoc('discordUrl')),
        when<Collection, Collection>(propIsNil('pictureUrl'), dissoc('pictureUrl')),
        when<Collection, Collection>(propIsNil('bannerUrl'), dissoc('bannerUrl')),
        when<Collection, Collection>(propIsNil('twitterUsername'), dissoc('twitterUsername'))
      ),
      objOf('collection')
    )(data)
  }
)
