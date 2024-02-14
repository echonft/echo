import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const ListingDetailsTargetCollectionOrOfferTitle: FunctionComponent<Props> = ({ title }) => (
  <div className={classes('w-max', 'p-2.5', 'rounded-lg', 'bg-white/[0.08]')}>
    <span className={classes('prose-label-md', 'text-white')}>{title}</span>
  </div>
)
