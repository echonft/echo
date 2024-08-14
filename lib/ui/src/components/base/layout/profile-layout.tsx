import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { PICTURE_SIZE_XXL } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent, PropsWithChildren } from 'react'

export interface ProfileBannerProps {
  bannerUrl?: Nullable<string>
}

export const ProfileLayout: FunctionComponent<PropsWithChildren<ProfileBannerProps>> = ({ bannerUrl, children }) => {
  const url = addPictureSize({ src: bannerUrl ?? '', width: PICTURE_SIZE_XXL })
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'bg-no-repeat',
        'select-none',
        'bg-cover',
        'bg-top',
        'overflow-clip',
        isNil(bannerUrl) ? `bg-[url(${DEFAULT_BANNER_URL})]` : `bg-[url(${url})]`
      )}
    >
      <div className={clsx('flex', 'flex-col', 'gap-10', 'backdrop-blur-md', 'pt-16')}>{children}</div>
    </div>
  )
}
