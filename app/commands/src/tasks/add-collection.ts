import { getContractMetadata } from '@echo/alchemy/services/get-contract-metadata'
import { addCollectionDefaultDiscordGuild } from '@echo/commands/tasks/add-collection-default-discord-guild'
import { addCollection as firestoreAddCollection } from '@echo/firestore/crud/collection/add-collection'
import { getCollectionSnapshot } from '@echo/firestore/crud/collection/get-collection'
import type { Collection } from '@echo/model/types/collection'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { always, andThen, assoc, converge, either, identity, ifElse, isNil, pipe, prop, T } from 'ramda'

export interface AddCollectionArgs {
  chainId: number
  address: string
  overrideChainId?: number
  overrideAddress?: string
}
export async function addCollection(args: AddCollectionArgs) {
  // FIXME This is not working with the new model
  const collection = await pipe<[AddCollectionArgs], Promise<Collection>, Promise<Collection>>(
    converge<
      Promise<Collection>,
      [(args: AddCollectionArgs) => number, (args: AddCollectionArgs) => string, (args: AddCollectionArgs) => true]
    >(getContractMetadata, [prop('chainId'), prop('address'), T]),
    andThen(
      pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ifElse(
          pipe<[Collection], AddCollectionArgs, boolean>(
            always(args),
            either(propIsNil('overrideChainId'), propIsNil('overrideAddress'))
          ),
          identity,
          assoc('contracts', [{ address: args.overrideAddress, chain: getChainById(args.overrideChainId!) }])
        ),
        firestoreAddCollection
      )
    )
  )(args)
  const snapshot = await getCollectionSnapshot(collection.slug)
  if (isNil(snapshot)) {
    throw new Error('Collection is not found')
  }
  await addCollectionDefaultDiscordGuild(snapshot.id)
}
