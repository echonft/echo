'use client'
import { NftStackLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-layout'
import { NftStackPicture } from '@echo/ui/components/nft/stack/nft-stack-picture'
import { NftStackTitle } from '@echo/ui/components/nft/stack/nft-stack-title'
import type { NftStack as NftStackModel } from '@echo/ui/types/nft-stack'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStackModel
}

export const NftStack: FunctionComponent<Props> = ({ stack }) => {
  return (
    <NftStackLayout>
      <NftStackPicture stack={stack} />
      <NftStackTitle stack={stack} />
    </NftStackLayout>
  )
}
