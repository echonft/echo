'use client'
import type { Collection } from '@echo/model/types/collection'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardTitle } from '@echo/ui/components/base/card/card-title'
import { CardLayout } from '@echo/ui/components/base/card/layout/card-layout'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { Color } from '@echo/ui/constants/color'
import { clsx } from 'clsx'
import { isNil, pick } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  collection: Collection
  options?: {
    borderColor?: Color.Yellow
  }
}

export const CollectionCard: FunctionComponent<Props> = ({ collection, options }) => {
  return (
    <CardLayout options={isNil(options?.borderColor) ? undefined : pick(['borderColor'], options)}>
      <CardPictureLayout>
        <CardImage src={collection.pictureUrl} alt={collection.name} />
      </CardPictureLayout>
      <div className={clsx('flex', 'w-full', 'min-w-0', 'h-[5.5rem]', 'rounded-b-2xl', 'px-2.75', 'items-center')}>
        <CardTitle label={collection.name} />
      </div>
    </CardLayout>
  )
}
