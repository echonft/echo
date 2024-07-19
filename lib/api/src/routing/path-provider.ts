import { Path } from '@echo/api/routing/path'
import { PathWithParams } from '@echo/api/routing/path-with-params'
import { selectionQueryMapper } from '@echo/api/routing/query-mappers/selection-query-mapper'
import type { SelectionQueryParams } from '@echo/api/types/routing/query-params/selection-query-params'
import type { SelectionSearchParams } from '@echo/api/types/routing/search-params/selection-search-params'
import type { Slug } from '@echo/model/types/slug'
import type { Username } from '@echo/model/types/username'

export const pathProvider = {
  auth: {
    signIn: new Path({ path: '/login', secure: false })
  },
  base: {
    home: new Path({ path: '/', secure: false })
  },
  collection: {
    all: new Path({ path: '/collections', secure: false }),
    default: new PathWithParams<Record<'slug', Slug>, SelectionQueryParams, SelectionSearchParams>({
      path: '/collection/:slug',
      secure: false,
      queryParamsMapper: selectionQueryMapper
    })
  },
  listing: {
    new: new Path({ path: '/listing', secure: true })
  },
  offer: {
    new: new Path({ path: '/offer', secure: true })
  },
  profile: {
    default: new Path<SelectionQueryParams, SelectionSearchParams>({
      path: '/me',
      secure: true,
      queryParamsMapper: selectionQueryMapper
    })
  },
  user: {
    default: new PathWithParams<Record<'username', Username>, SelectionQueryParams, SelectionSearchParams>({
      path: '/user/:username',
      secure: false,
      queryParamsMapper: selectionQueryMapper
    })
  }
}
