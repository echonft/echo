'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selection: Nft[]
  onSelect?: (nft: Nft) => unknown
  onUnselect?: (nft: Nft) => unknown
}

export const CreateListingNftsSelection: FunctionComponent<Props> = ({ nfts, selection, onSelect, onUnselect }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
      <SelectableNfts
        nfts={nfts}
        selection={selection}
        options={{ owner: { hide: true } }}
        style={{ selectionContainer: { minWitdh: true } }}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
    </div>
  )
}
