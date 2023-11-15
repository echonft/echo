'use client'
import { type Nft } from '@echo/model/types/nft'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { NftCardPicture } from '@echo/ui/components/nft/card/nft-card-picture'
import { SelectableNftCardSelector } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-selector'
import { UserDiscordTagOffer } from '@echo/ui/components/shared/user-discord-tag-offer'
import { type DisableableType } from '@echo/ui/types/disableable'
import { type SelectableType } from '@echo/ui/types/selectable'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  nft: DisableableType<SelectableType<Nft>>
  hideOwner?: boolean
  onToggleSelection?: (nft: DisableableType<SelectableType<Nft>>) => unknown
}

export const SelectableNftCard: FunctionComponent<Props> = ({ nft, hideOwner, onToggleSelection }) => {
  const { owner, selected, disabled } = nft
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'rounded-2xl',
        'w-52',
        'h-max',
        'border',
        'border-solid',
        'overflow-clip',
        selected ? 'border-yellow-500' : 'border-transparent',
        disabled && 'opacity-40'
      )}
    >
      <div className={'relative'}>
        <NftCardPicture nft={nft} />
        <HideIf condition={Boolean(disabled)}>
          <SelectableNftCardSelector
            selected={selected}
            onToggleSelection={() => {
              onToggleSelection?.(nft)
            }}
          />
        </HideIf>
        <HideIf condition={Boolean(hideOwner)}>
          <div className={clsx('absolute', 'bottom-2', 'left-2', 'z-10')}>
            <UserDiscordTagOffer owner={owner.discord.username} />
          </div>
        </HideIf>
      </div>
      {/*<NftCardTitle tokenId={tokenId} collectionName={collection.name} />*/}
    </div>
  )
}
