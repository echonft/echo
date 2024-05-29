'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import { clsx } from 'clsx'
import { isEmpty } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  nfts: Nft[]
  selection: Nft[]
  onSelect?: (nft: Nft) => unknown
  onUnselect?: (nft: Nft) => unknown
}

export const CreateListingNftsSelection: FunctionComponent<Props> = ({ nfts, selection, onSelect, onUnselect }) => {
  const collapsible = isEmpty(selection)

  return (
    <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
      <SelectableNfts
        nfts={nfts}
        groupBy={groupNftsByCollection}
        selection={selection}
        options={{ owner: { hide: true } }}
        style={{ collapsible, selectionContainer: { minWitdh: true } }}
        onSelect={onSelect}
        onUnselect={onUnselect}
      />
    </div>
  )
}
