import type { Listing } from '@echo/model/types/listing'
import { CollectionCard } from '@echo/ui/components/collection/card/collection-card'
import { Color } from '@echo/ui/constants/color'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  target: Listing['target']
}

export const ListingDetailsTarget: FunctionComponent<Props> = ({ target }) => {
  return (
    <div className={clsx('flex', 'w-full', 'self-stretch', 'h-max', 'gap-4', 'items-center')}>
      <CollectionCard collection={target.collection} options={{ borderColor: Color.Yellow }} />
      {target.quantity > 1 ? (
        <p className={clsx('w-max', 'text-white', 'prose-display-md-bold')}>{`X${target.quantity}`}</p>
      ) : null}
    </div>
  )
}
