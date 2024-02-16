import { getContractMetadata } from '@echo/alchemy/services/get-contract-metadata'
import { addCollectionDefaultDiscordGuild } from '@echo/commands/tasks/add-collection-default-discord-guild'
import { addCollection as firestoreAddCollection } from '@echo/firestore/crud/collection/add-collection'
import type { Collection } from '@echo/model/types/collection'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { always, andThen, assocPath, converge, either, identity, ifElse, pipe, prop, T } from 'ramda'

export interface AddCollectionArgs {
  chainId: number
  address: string
  overrideChainId?: number
  overrideAddress?: string
}
export async function addCollection(args: AddCollectionArgs) {
  const collection = await pipe<[AddCollectionArgs], Promise<Omit<Collection, 'id'>>, Promise<Collection>>(
    converge<
      Promise<Omit<Collection, 'id'>>,
      [(args: AddCollectionArgs) => number, (args: AddCollectionArgs) => string, (args: AddCollectionArgs) => true]
    >(getContractMetadata, [prop('chainId'), prop('address'), T]),
    andThen(
      pipe(
        ifElse(
          pipe<[Omit<Collection, 'id'>], AddCollectionArgs, boolean>(
            always(args),
            either(propIsNil('overrideChainId'), propIsNil('overrideAddress'))
          ),
          identity,
          pipe(
            assocPath(['contract', 'address'], args.overrideAddress),
            assocPath(['contract', 'chainId'], args.overrideChainId)
          )
        ),
        firestoreAddCollection
      )
    )
  )(args)
  await addCollectionDefaultDiscordGuild(collection.id)
}
