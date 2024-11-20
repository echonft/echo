import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { PictureSize } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export interface ProfileBannerProps {
  bannerUrl?: Nullable<string>
}

export const ProfileLayout: FunctionComponent<PropsWithChildren<ProfileBannerProps>> = ({ bannerUrl, children }) => {
  const url = addPictureSize({ src: bannerUrl ?? '', width: PictureSize.XXL })
  const isBackgroundImageNilOrEmpty = isNilOrEmpty(bannerUrl)
  function getStyle() {
    if (isBackgroundImageNilOrEmpty) {
      return
    }
    return {
      backgroundImage: `${themeExtension.backgroundImage.banner}, url('${url}')`
    }
  }
  return (
    <div
      className={clsx(
        'w-full',
        'h-full',
        'select-none',
        'overflow-clip',
        !isBackgroundImageNilOrEmpty && ['bg-no-repeat', 'bg-contain', 'bg-top']
      )}
      style={getStyle()}
    >
      <PaddedLayout>
        <div
          className={clsx('flex', 'flex-col', 'gap-10', 'pt-16', !isBackgroundImageNilOrEmpty && 'backdrop-blur-md')}
        >
          {children}
        </div>
      </PaddedLayout>
    </div>
  )
}
