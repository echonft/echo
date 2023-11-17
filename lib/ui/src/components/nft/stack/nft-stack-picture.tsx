import type { Nft } from '@echo/model/types/nft'
import { Img } from '@echo/ui/components/base/img'
import { NftCardDiscordTag } from '@echo/ui/components/nft/card/nft-card-discord-tag'
import { NftStackPictureLayout } from '@echo/ui/components/nft/stack/layout/nft-stack-picture-layout'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
}

export const NftStackPicture: FunctionComponent<Props> = ({ stack }) => {
  return (
    <NftStackPictureLayout>
      <Img
        className={clsx('select-none', 'rounded-2xl')}
        src={stack.pictureUrl}
        alt={stack.tokenId.toString()}
        width={202}
        height={202}
      />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <NftCardDiscordTag nft={{ owner: stack.owner } as Nft} />
      </div>
    </NftStackPictureLayout>
  )
}
