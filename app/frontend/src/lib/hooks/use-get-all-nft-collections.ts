import { fetcher } from '../helpers/fetcher'
import { allNftCollectionApiUrl, GetNftCollectionsResponse } from '@echo/api'
import useSWR from 'swr'

export const useGetAllNftCollections = () =>
  useSWR<GetNftCollectionsResponse, Error, URL>(allNftCollectionApiUrl(), (url) =>
    fetcher(url).method('GET').fetchResponse<GetNftCollectionsResponse>()
  )
