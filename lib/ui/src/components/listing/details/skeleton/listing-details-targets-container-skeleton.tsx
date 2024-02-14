import { ProfilePictureSkeleton } from '@echo/ui/components/base/profile-picture-skeleton'
import { SIZE_SM } from '@echo/ui/constants/size'
import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

export const ListingDetailsTargetsContainerSkeleton: FunctionComponent = () => {
  return (
    <div className={classes('flex', 'flex-row', 'items-center', 'gap-4.5')}>
      <div
        className={classes(
          'flex',
          'flex-row',
          'pt-3.5',
          'pb-3.75',
          'px-3.25',
          'gap-3.5',
          'items-center',
          'w-96',
          'rounded-lg',
          'border',
          'border-white/10'
        )}
      >
        <ProfilePictureSkeleton size={SIZE_SM} border={false} />
      </div>
    </div>
  )
}
