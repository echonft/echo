import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const ListingDetailsTargetCollectionOrOfferTitle: FunctionComponent<Props> = ({ title }) => (
  <div className={clsx('w-max', 'p-2.5', 'rounded-lg', 'bg-white/[0.08]')}>
    <span className={clsx('prose-label-md', 'text-white')}>{title}</span>
  </div>
)
