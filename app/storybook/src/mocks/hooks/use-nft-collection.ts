import { delayPromise } from '../../utils/delay-promise'
import { findNftCollectionBySlug } from '../../utils/find-nft-collection-by-slug'
import { NftCollection } from '@echo/model'
import useSWR from 'swr'

export const useNftCollection = (slug: string) =>
  useSWR<NftCollection, Error, string>(
    `useNftCollection-${slug}`,
    () => delayPromise(Promise.resolve(findNftCollectionBySlug(slug))),
    {
      suspense: true
    }
  )
