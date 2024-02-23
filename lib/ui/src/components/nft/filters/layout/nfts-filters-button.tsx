import { NftsFiltersButtonCount } from '@echo/ui/components/nft/filters/layout/nfts-filters-button-count'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  label: string
  count: number
  onClick?: MouseEventHandler
}

export const NftsFiltersButton: FunctionComponent<Props> = ({ label, count, onClick }) => {
  return (
    <button
      disabled={count === 0}
      onClick={onClick}
      className={classes(
        'btn-gradient',
        'group',
        '!justify-between',
        'w-full',
        'p-2.5',
        'h-[2.875rem]',
        'items-center'
      )}
    >
      <span className={classes('prose-label-sm-semi', 'btn-label-gradient')}>{label}</span>
      <NftsFiltersButtonCount count={count} />
    </button>
  )
}
