'use client'
import { MultiSelectableProps } from '../../../../types/multi-selectable-props'
import { NftThumbnailSelectable } from '../../thumbnail/nft-thumbnail-selectable'
import { NftsLayout } from '../nfts-layout'
import { Nft } from '@echo/ui-model'
import { concat, isEmpty, isNil, map, without } from 'ramda'
import { FunctionComponent } from 'react'

interface Props extends MultiSelectableProps<string> {
  nfts: Array<Nft>
}

export const SelectableNftContainer: FunctionComponent<Props> = ({ nfts, selection, onSelectionUpdate }) => {
  return (
    <NftsLayout>
      {map(
        (nft) => (
          <NftThumbnailSelectable
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
