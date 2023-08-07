/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getNftCollectionSnapshotByContractAddress } from './get-nft-collection-snapshot-by-contract-address'
import { FirestoreNftCollectionData } from '@echo/firestore'
import { andThenOtherwise, toErrorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

interface Arguments {
  address: string
  chainId: number
}

export const findCollectionByAddress = (args: Arguments): Promise<R.Result<FirestoreNftCollectionData, Error>> =>
  // @ts-ignore
  pipe(
    // @ts-ignore
    getNftCollectionSnapshotByContractAddress,
    andThenOtherwise(
      (snapshot) =>
        R.fromNullable(
          { ...snapshot.data(), id: snapshot.ref.id, refPath: snapshot.ref.path },
          Error('collection does not exist')
        ),
      pipe(toErrorPromise, R.fromPromise)
    )
  )(args)
