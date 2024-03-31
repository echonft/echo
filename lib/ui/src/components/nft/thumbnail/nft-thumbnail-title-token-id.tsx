import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const NftThumbnailTitleTokenId: FunctionComponent<Props> = ({ label }) => {
  return (
    <p
      className={clsx(
        'font-inter',
        'text-[0.75rem]',
        'font-medium',
        'leading-[0.8125rem]',
        'tracking-[0.015rem]',
        'text-white/70',
        'truncate'
      )}
    >
      {label}
    </p>
  )
}
