import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
  hideOwner?: boolean
  scaleDisabled?: boolean
}

export const NftStackPicture: FunctionComponent<Props> = ({ stack, hideOwner, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={stack.pictureUrl} alt={stack.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <div className={clsx('flex', 'flex-row', 'items-center', 'justify-center')}>
          <HideIf condition={Boolean(hideOwner)}>
            <CardDiscordTag username={stack.owner.discord.username} />
          </HideIf>
        </div>
      </div>
    </StackPictureLayout>
  )
}
