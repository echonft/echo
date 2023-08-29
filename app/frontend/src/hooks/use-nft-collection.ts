import { nftCollectionApiUrl } from '@echo/api-public'
import { NftCollection } from '@echo/ui-model'
import { getData } from '@echo/utils'
import useSWR from 'swr'

export const useNftCollection = (slug: string) => useSWR<NftCollection, Error, URL>(nftCollectionApiUrl(slug), getData)
