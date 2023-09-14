'use client'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import type { Nft } from '@echo/ui/types/model/nft'
import type { MultiSelectableProps } from '@echo/ui/types/multi-selectable-props'
import { concat, isEmpty, isNil, map, without } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props extends MultiSelectableProps<string> {
  nfts: Array<Nft>
}

export const SelectableNftsContainer: FunctionComponent<Props> = ({ nfts, selection, onSelectionUpdate }) => {
  return (
    <NftsLayout>
      {map(
        (nft) => (
          <SelectableNftThumbnail
            key={nft.id}
            nft={nft}
            linkDisabled={!isEmpty(selection)}
            selected={!isNil(selection) && selection.includes(nft.id)}
            onToggleSelection={(nftId: string, selected: boolean) => {
              if (selected) {
                onSelectionUpdate?.(concat([nftId], selection))
              } else {
                onSelectionUpdate?.(without([nftId], selection))
              }
            }}
          />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
