import type { Collection } from '@echo/model/types/collection'
import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export const CollectionDetailsDescription: FunctionComponent<Pick<Collection, 'description'>> = ({ description }) => {
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-row', 'self-stretch', 'w-full', 'pt-8')}>
        <p className={clsx('prose-header-xs', 'text-white/60', 'w-[37rem]')}>{description}</p>
      </div>
    </PaddedContainer>
  )
}
