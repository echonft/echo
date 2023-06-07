import { getRoute } from '../constants/get-route'
import { AlchemyV3Routes } from '../constants/routes'
import { mapContractMetadata } from '../mappers/map-contract-metadata'
import { GetContractMetadataRequest } from '../types/request/get-contract-metadata-request'
import { ContractResponse } from '../types/response/contract-response'
import { FirestoreNftCollectionPrototype } from '@echo/firestore'
import { castAs, errorPromise, getData, toPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, ifElse, pipe } from 'ramda'

export const getContractMetadata = (contractAddress: string) =>
  pipe(
    getData<ContractResponse, GetContractMetadataRequest>,
    andThen(
      ifElse(
        R.isOk,
        pipe(R.getExn, mapContractMetadata, toPromise, R.fromPromise),
        pipe(errorPromise('getContractMetadata error mapping'), R.fromPromise)
      )
    ),
    castAs<Promise<R.Result<Omit<FirestoreNftCollectionPrototype, 'discordGuild'>, Error>>>
  )(getRoute(AlchemyV3Routes.GET_CONTRACT_METADATA), { contractAddress })
