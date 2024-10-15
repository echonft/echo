import type { ListingTarget } from '@echo/model/types/listing-target'
import type { OwnedNft } from '@echo/model/types/nft'
import { SelectableNftThumbnails } from '@echo/ui/components/nft/selectable-thumbnail/selectable-nft-thumbnails'
import { CreateTradeBottomBarButtonLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-button-layout'
import { CreateTradeBottomBarItemsLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-items-layout'
import { CreateTradeBottomBarLayout } from '@echo/ui/components/trade/layout/create-trade-bottom-bar-layout'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  loading: boolean
  items:OwnedNft[]
    onUnselectItem:
    target:ListingTarget
  onBack?: () => void
  onNext?: () => void
}

export const CreateTradeBottomBar: FunctionComponent<Props> = ({ loading, onNext, onBack }) => {
  return (
    <CreateTradeBottomBarLayout>
      <CreateTradeBottomBarButtonLayout>
        <button
          className={clsx(
            'btn-gradient',
            'flex',
            'flex-row',
            'gap-2.5',
            'group',
            loading && 'animate-pulse',
            isNil(onBack) && 'invisible'
          )}
          disabled={loading}
          onClick={() => {
            onBack?.()
          }}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{'back'}</span>
        </button>
      </CreateTradeBottomBarButtonLayout>
      <CreateTradeBottomBarItemsLayout>
        <SelectableNftThumbnails nfts={selection} onRemove={onUnselect} style={style?.selectionContainer} />
      </CreateTradeBottomBarItemsLayout>
      <CreateTradeBottomBarButtonLayout>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          disabled={loading}
          onClick={() => {
            onNext?.()
          }}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('createBtn')}</span>
        </button>
      </CreateTradeBottomBarButtonLayout>
    </CreateTradeBottomBarLayout>
  )
}
