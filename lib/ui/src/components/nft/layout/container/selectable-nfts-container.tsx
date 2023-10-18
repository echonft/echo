'use client'
import { type Nft } from '@echo/model/types/nft'
import { NftsLayout } from '@echo/ui/components/nft/layout/nfts-layout'
import { SelectableNftThumbnail } from '@echo/ui/components/nft/thumbnail/selectable-nft-thumbnail'
import { type DisableableType } from '@echo/ui/types/disableable'
import { type SelectableType } from '@echo/ui/types/selectable'
import { map } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  nfts: DisableableType<SelectableType<Nft>>[]
  selectionCount: number
  onToggleSelection?: (nft: DisableableType<SelectableType<Nft>>) => unknown
}

export const SelectableNftsContainer: FunctionComponent<Props> = ({ nfts, selectionCount, onToggleSelection }) => {
  return (
    <NftsLayout>
      {map(
        (nft) => (
          <SelectableNftThumbnail
            key={nft.id}
            nft={nft}
            linkDisabled={selectionCount > 0}
            onToggleSelection={onToggleSelection}
          />
        ),
        nfts
      )}
    </NftsLayout>
  )
}
