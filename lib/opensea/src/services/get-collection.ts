import { chains } from '@echo/model/constants/chain'
import { isTestnetChain } from '@echo/model/helpers/chain/is-testnet-chain'
import type { ChainProps } from '@echo/model/types/chain'
import type { Collection } from '@echo/model/types/collection'
import { fetchCollection } from '@echo/opensea/fetchers/fetch-collection'
import { error, info } from '@echo/opensea/helpers/logger'
import type { FetchCollectionRequest } from '@echo/opensea/types/request/fetch-collection-request'
import { Network } from '@echo/utils/constants/network'
import type { Nullable } from '@echo/utils/types/nullable'
import { assoc, find, isNil, nth, otherwise, pipe, propEq, toLower, values } from 'ramda'

function fetchMainnetCollection({ chain, slug }: FetchCollectionRequest) {
  const regex = /^(.+)-\d+$/
  const match = regex.exec(slug)
  info({ chain, slug }, 'trying to get mainnet slug')
  if (isNil(match)) {
    return undefined
  }
  const mainnetSlug = nth(1, match)
  if (isNil(mainnetSlug)) {
    return undefined
  }
  info({ chain, slug: mainnetSlug }, 'found potential slug')
  return pipe(
    fetchCollection,
    otherwise((err) => {
      error({ err, chain }, 'could not fetch mainnet collection')
      return undefined
    })
  )({ chain, slug: toLower(mainnetSlug) })
}

export async function getCollection(args: FetchCollectionRequest): Promise<Nullable<Collection>> {
  const collection = await fetchCollection(args)
  if (!isNil(collection) && isTestnetChain(args.chain)) {
    // chain does not matter here, but it has to be on mainnet
    const mainnetChainProps = pipe(
      values,
      find<ChainProps>(propEq<Network, 'network'>(Network.Mainnet, 'network'))
    )(chains)
    if (isNil(mainnetChainProps)) {
      return collection
    }
    const mainnetCollection = await fetchMainnetCollection(assoc('chain', mainnetChainProps.name, args))
    if (!isNil(mainnetCollection)) {
      return pipe(assoc('contract', collection.contract), assoc('slug', collection.slug))(mainnetCollection)
    }
    return collection
  }
  return collection
}
