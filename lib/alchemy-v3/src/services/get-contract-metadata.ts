import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapContractMetadata } from '../mappers/map-contract-metadata'
import { GetContractMetadataRequest } from '../types/request/get-contract-metadata-request'
import { GetContractMetadataResponse } from '../types/response/get-contract-metadata-response'
import { FirestoreNftCollectionPrototype } from '@echo/firestore'
import { errorPromise, getData, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, ifElse, pipe } from 'ramda'

export const getContractMetadata = (contractAddress: string) =>
  pipe(
    getData<GetContractMetadataResponse, GetContractMetadataRequest>,
    andThen(
      ifElse(
        R.isOk,
        pipe(
          R.getExn<GetContractMetadataResponse, Error>,
          mapContractMetadata,
          toPromise,
          R.fromPromise<Omit<FirestoreNftCollectionPrototype, 'discordGuild'>>
        ),
        pipe(
          errorPromise<Omit<FirestoreNftCollectionPrototype, 'discordGuild'>>('getContractMetadata error mapping'),
          R.fromPromise<Omit<FirestoreNftCollectionPrototype, 'discordGuild'>>
        )
      )
    )
  )(getRoute(AlchemyV3Routes.GET_CONTRACT_METADATA), { contractAddress })
