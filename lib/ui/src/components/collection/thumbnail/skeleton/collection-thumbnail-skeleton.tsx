import { CollectionThumbnailLayout } from '@echo/ui/components/collection/thumbnail/layout/collection-thumbnail-layout'
import { type FunctionComponent } from 'react'

export const CollectionThumbnailSkeleton: FunctionComponent = () => {
  return <CollectionThumbnailLayout loading={true} />
}
