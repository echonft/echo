import type { CloudFunctionName } from '@echo/firestore-functions/constants/cloud-function-name'
import { AbstractPath, type PathArgs } from '@echo/routing/path/abstract-path'
import type { QueryParams } from '@echo/routing/types/query-params/query-params'
import type { SearchParams } from '@echo/routing/types/search-params/search-params'
import { assoc, pipe } from 'ramda'

interface Params extends Record<PropertyKey, string | string[]> {
  projectId: string
  name: CloudFunctionName
}

class CloudFunctionPath<
  TParams extends Record<PropertyKey, string | string[]>,
  TQueryParams extends QueryParams = never,
  TSearchParams extends SearchParams = TQueryParams extends SearchParams ? TQueryParams : SearchParams
> extends AbstractPath<TParams, TQueryParams, TSearchParams> {
  constructor(args: Omit<PathArgs<TQueryParams, TSearchParams>, 'baseUrl' | 'secure'>) {
    super(pipe(assoc('secure', true), assoc('baseUrl', 'https://cloudfunctions.googleapis.com/v2beta'))(args))
  }
}

export const cloudFunctionPath = new CloudFunctionPath<Params>({
  path: '/projects/:projectId/locations/us-central1/functions/:name'
})
