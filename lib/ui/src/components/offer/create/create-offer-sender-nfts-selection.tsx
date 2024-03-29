'use client'
import { type Nft } from '@echo/model/types/nft'
import { SelectableNftGroups } from '@echo/ui/components/nft/group/selectable-nft-groups'
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

export const CreateOfferSenderNftsSelection = <T extends Nft>({ nfts, selection, onSelect, onUnselect }: Props<T>) => {
  const collapsible = isEmpty(selection)

  return (
    <div className={clsx('flex', 'flex-row', 'justify-center', 'h-max', 'w-full', 'px-8')}>
      <SelectableNftGroups
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
