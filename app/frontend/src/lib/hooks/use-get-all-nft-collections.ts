import { fetcher } from '../helpers/fetcher'
import { allNftCollectionsApiUrl, GetNftCollectionsResponse } from '@echo/api'
import useSWR from 'swr'

export const useGetAllNftCollections = () =>
  useSWR<GetNftCollectionsResponse, Error, URL>(allNftCollectionsApiUrl(), (url) =>
    fetcher(url).method('GET').fetchResponse<GetNftCollectionsResponse>()
  )
