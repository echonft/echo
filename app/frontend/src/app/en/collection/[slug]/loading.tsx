import { CollectionDetailsSkeleton } from '@echo/ui'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

const CollectionLoading: FunctionComponent = () => {
  return (
    <section className={clsx('w-full')}>
      <CollectionDetailsSkeleton />
    </section>
  )
}

export default CollectionLoading
