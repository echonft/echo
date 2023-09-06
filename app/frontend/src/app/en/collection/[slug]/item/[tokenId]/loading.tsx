import { NftDetailsSkeleton } from '@echo/ui'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

const NftDetailsLoading: FunctionComponent = () => {
  return (
    <section className={clsx('w-full', 'pt-12')}>
      <NftDetailsSkeleton />
    </section>
  )
}

export default NftDetailsLoading
