import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Collection } from '@echo/model/types/collection'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { converge, drop, identity, modify, partial, path, pipe, take, unless } from 'ramda'

interface SliceCollectionsArgs {
  constraints: QueryConstraints<Collection>
  collections: Collection[]
}
export function sliceCollections(args: SliceCollectionsArgs) {
  return pipe(
    unless(
      pathIsNil(['constraints', 'offset']),
      converge(partial(modify, ['collections']), [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        converge(drop, [path(['constraints', 'offset'])]),
        identity
      ])
    ),
    unless(
      pathIsNil(['constraints', 'limit']),
      converge(partial(modify, ['collections']), [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        converge(take, [path(['constraints', 'limit'])]),
        identity
      ])
    )
  )(args) as SliceCollectionsArgs
}
