'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNfts } from '@echo/ui/components/nft/selectable/selectable-nfts'
import { groupNftsByCollection } from '@echo/ui/helpers/nft/group/group-nfts-by-collection'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { clsx } from 'clsx'
import { isEmpty } from 'ramda'

interface Props<T extends Nft> {
  nfts: T[]
  selection: SelectableNft[]
  onSelect?: (nft: SelectableNft) => unknown
  onUnselect?: (nft: SelectableNft) => unknown
}

export const CreateListingNftsSelection = <T extends Nft>({ nfts, selection, onSelect, onUnselect }: Props<T>) => {
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
