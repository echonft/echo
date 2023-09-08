import { fetcher } from '../helpers/fetcher'
import { mapQueryConstraintsToQueryParams } from '../helpers/request/map-query-constraints-to-query-params'
import { allNftCollectionsApiUrl, GetNftCollectionsResponse } from '@echo/api'
import useSWR from 'swr'

export const useGetAllNftCollections = () =>
  useSWR<GetNftCollectionsResponse, Error, URL>(allNftCollectionsApiUrl(), (url) => {
    const constraintsQueryParams = mapQueryConstraintsToQueryParams({
      orderBy: { field: 'name' }
    })
    return fetcher(url).method('GET').query(constraintsQueryParams).fetchResponse<GetNftCollectionsResponse>()
  })
