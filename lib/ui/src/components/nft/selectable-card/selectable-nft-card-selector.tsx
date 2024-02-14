import { SelectableNftCardSelectorNotSelected } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-selector-not-selected'
import { SelectableNftCardSelectorSelected } from '@echo/ui/components/nft/selectable-card/selectable-nft-card-selector-selected'
import { classes } from '@echo/ui/helpers/classes'
import type { SelectableNft } from '@echo/ui/types/selectable-nft'
import { type FunctionComponent } from 'react'

interface Props {
  nft: SelectableNft
  onToggleSelection?: (nft: SelectableNft, selected: boolean) => unknown
}

export const SelectableNftCardSelector: FunctionComponent<Props> = ({ nft, onToggleSelection }) => {
  const { disabled, selectionDisabled, selected } = nft
  if (!disabled && !selectionDisabled) {
    if (selected) {
      return (
        <div className={classes('absolute', 'top-2', 'right-2', 'h-max', 'w-max')}>
          <SelectableNftCardSelectorSelected
            onToggleSelection={(selected) => {
              onToggleSelection?.(nft, selected)
            }}
          />
        </div>
      )
    }
    return (
      <div
        className={classes(
          'absolute',
          'top-2',
          'right-2',
          'h-max',
          'w-max',
          'transition-opacity ease-in-out',
          'opacity-0',
          'group-hover:opacity-100'
        )}
      >
        <SelectableNftCardSelectorNotSelected
          onToggleSelection={(selected) => {
            onToggleSelection?.(nft, selected)
          }}
        />
      </div>
    )
  }
  return null
}
