import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Collection } from '@echo/model/types/collection'
import { isNil, map, modify, path, pick } from 'ramda'

interface SelectCollectionFieldsArgs {
  constraints: QueryConstraints<Collection>
  collections: Collection[]
}
export function selectCollectionsFields(args: SelectCollectionFieldsArgs) {
  const fields = path(['constraints', 'select'], args)
  if (isNil(fields)) {
    return args
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return modify('collections', map<Collection, Collection>(pick(fields)), args) as SelectCollectionFieldsArgs
}
