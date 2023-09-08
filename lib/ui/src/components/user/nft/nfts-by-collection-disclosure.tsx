import { CollapsibleProps } from '../../../types/collapsible-props'
import { MultiSelectableProps } from '../../../types/multi-selectable-props'
import { NftThumbnailSelectable } from '../../nft/nft-thumbnail-selectable'
import { NftsByCollectionDisclosureButton } from './nfts-by-collection-disclosure-button'
import { Nft } from '@echo/ui-model'
import { NonEmptyArray } from '@echo/utils'
import { Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { head, isEmpty, isNil, map } from 'ramda'
import { FunctionComponent } from 'react'

interface Props extends CollapsibleProps, MultiSelectableProps<string> {
  nfts: NonEmptyArray<Nft>
}

export const NftsByCollectionDisclosure: FunctionComponent<Props> = ({
  nfts,
  selection,
  collapsed,
  onToggleCollapsed,
  onAddSelection,
  onRemoveSelection
}) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-4', 'h-max')}>
      <NftsByCollectionDisclosureButton
        collectionName={head(nfts).collection.name}
        collapsed={collapsed ?? false}
        onToggleCollapsed={onToggleCollapsed}
      />
      <Transition
        show={collapsed ?? false}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className={clsx('flex', 'flex-row', 'grow', 'flex-wrap', 'gap-6', 'h-max')}>
          {map(
            (nft) => (
              <NftThumbnailSelectable
                key={nft.id}
                nft={nft}
                linkDisabled={!isEmpty(selection)}
                selected={!isNil(selection) && selection.includes(nft.id)}
                onToggleSelection={(nftId: string, selected: boolean) => {
                  if (selected) {
                    onAddSelection?.(nftId)
                  } else {
                    onRemoveSelection?.(nftId)
                  }
                }}
              />
            ),
            nfts
          )}
        </div>
      </Transition>
    </div>
  )
}
