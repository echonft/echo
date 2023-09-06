import { Banner } from '../../base/banner'
import { CollectionProfilePicture } from '../../collection/collection-profile-picture'
import { SizeMD } from '@echo/ui-model/dist'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  collectionName: string
  quantity: number
  bannerUrl: URL | undefined
  pictureUrl: URL | undefined
}

export const NewListingSliderTargetRow: FunctionComponent<Props> = ({ collectionName, bannerUrl, pictureUrl }) => {
  return (
    <div className={clsx('relative', 'w-full', 'h-40', 'rounded-lg', 'overflow-clip')}>
      <Banner bannerUrl={bannerUrl} size={SizeMD} />
      <div className={clsx('absolute', 'left-2.5', 'bottom-3')}>
        <CollectionProfilePicture collectionName={collectionName} pictureUrl={pictureUrl} size={SizeMD} />
      </div>
    </div>
  )
}
