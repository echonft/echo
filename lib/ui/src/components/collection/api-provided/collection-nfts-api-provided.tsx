'use client'
import { CollectionNfts } from '../collection-nfts'
import { NftResponse } from '@echo/api'
import { getTraitsForNfts, mapNft } from '@echo/ui-model'
import { map } from 'ramda'
import { FunctionComponent } from 'react'

export interface CollectionNftsApiProvidedProps {
  nftResponses: NftResponse[]
}

export const CollectionNftsApiProvided: FunctionComponent<CollectionNftsApiProvidedProps> = ({ nftResponses }) => {
  // TODO we might have to show the skeleton if this is slow
  const nfts = map(mapNft, nftResponses)
  return <CollectionNfts nfts={nfts} traits={getTraitsForNfts(nfts)} />
}
