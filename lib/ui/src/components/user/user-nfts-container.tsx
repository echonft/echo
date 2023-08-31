import { HideIfNil } from '../base/hide-if-nil'
import { ShowIf } from '../base/show-if'
import { Spinner } from '../base/spinner'
import { NftThumbnailSelectable } from '../nft/nft-thumbnail-selectable'
import { Nft } from '@echo/ui-model'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface UserNftsContainerProps {
  nfts: Nft[]
  selection?: string[]
  isLoading?: boolean
  onToggleSelection?: (id: string, selected: boolean) => unknown
  onMakeOfferForNft?: (id: string) => unknown
}

export const UserNftsContainer: FunctionComponent<UserNftsContainerProps> = ({
  nfts,
  selection,
  isLoading,
  onToggleSelection,
  onMakeOfferForNft
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'self-stretch', 'grow', 'flex-wrap', 'gap-6', 'relative')}>
      <ShowIf condition={Boolean(isLoading)}>
        <div
          className={clsx(
            'absolute',
            'inset-0',
            'bg-dark-500/60',
            'flex',
            'justify-center',
            'items-center',
            'rounded-2xl',
            'z-20'
          )}
        >
          <Spinner />
        </div>
      </ShowIf>
      <HideIfNil
        checks={nfts}
        render={() =>
          nfts.map((nft) => (
            <NftThumbnailSelectable
              key={nft.id}
              nft={nft}
              hideOwner={true}
              selected={!isNil(selection) && selection.includes(nft.id)}
              onToggleSelection={onToggleSelection}
              onMakeOffer={onMakeOfferForNft}
            />
          ))
        }
      />
    </div>
  )
}
