'use client'
import { type Nft } from '@echo/model/types/nft'
import { NftStackLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-layout'
import { NftStackPicture } from '@echo/ui/components/nft/stack/nft-stack-picture'
import { NftStackTitle } from '@echo/ui/components/nft/stack/nft-stack-title'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { head } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
}

export const NftStack: FunctionComponent<Props> = ({ nfts }) => {
  if (isNonEmptyArray(nfts)) {
    const nft = head(nfts)
    return (
      <NftStackLayout>
        <NftStackPicture nft={nft} />
        <NftStackTitle nft={nft} />
      </NftStackLayout>
    )
  }
  return null
}
