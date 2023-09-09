import { DirectionOut } from '../../../constants/swap-direction'
import { NftsContainer } from '../../nft/layout/container/nfts-container'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { ListingItem } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { FunctionComponent, useMemo } from 'react'

interface Props {
  items: Array<ListingItem>
}

export const ListingRowItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const t = useTranslations('shared.assets')
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return (
    <div className={clsx('flex', 'flex-col', 'gap-5')}>
      <SwapDirectionHeader direction={DirectionOut} title={t('out')} />
      <NftsContainer nfts={nfts} />
    </div>
  )
}
