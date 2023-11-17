import type { OrderByParameters } from '@echo/firestore/types/query/order-by-parameters'
import type { QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import type { Collection } from '@echo/model/types/collection'
import { isIn } from '@echo/utils/fp/is-in'
import {
  ascend,
  compose,
  descend,
  filter,
  head,
  ifElse,
  is,
  isNil,
  keysIn,
  map,
  modify,
  type Ordering,
  path,
  pipe,
  prop,
  propEq,
  sortWith,
  toLower
} from 'ramda'

interface SortCollectionsArgs {
  constraints: QueryConstraints<Collection>
  collections: Collection[]
}
export function sortCollections(args: SortCollectionsArgs) {
  const constraint = path(['constraints', 'orderBy'], args)
  if (isNil(constraint)) {
    return args
  }
  const collection = pipe<[SortCollectionsArgs], Collection[], Collection>(prop('collections'), head)(args)
  const collectionKeys = keysIn(collection)
  const sortCollections = pipe<
    [OrderByParameters[]],
    OrderByParameters[],
    ((a: Collection, b: Collection) => Ordering)[],
    (list: Collection[]) => Collection[]
  >(
    filter(pipe(prop('field'), isIn(collectionKeys))),
    map(
      ifElse(
        propEq('asc', 'direction'),
        pipe<[OrderByParameters], string, (a: Collection, b: Collection) => Ordering>(
          prop('field'),
          (propKey: string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (pipe(prop(propKey), is(String))(collection)) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return ascend<Collection>(compose(toLower, prop(propKey)))
            } else {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return ascend<Collection>(prop(propKey))
            }
          }
        ),
        pipe<[OrderByParameters], string, (a: Collection, b: Collection) => Ordering>(
          prop('field'),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          (propKey: string) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (pipe(prop(propKey), is(String))(collection)) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return descend<Collection>(compose(toLower, prop(propKey)))
            } else {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return descend<Collection>(prop(propKey))
            }
          }
        )
      )
    ),
    sortWith<Collection>
  )(constraint)
  // const tempSort = sortWith([ascend(prop('name'))])
  return modify('collections', sortCollections, args) as SortCollectionsArgs
}
