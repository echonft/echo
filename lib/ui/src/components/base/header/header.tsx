'use client'
import type { User } from '@echo/model/types/user'
import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { HeaderSearch } from '@echo/ui/components/base/header/header-search'
import { HeaderButtonSkeleton } from '@echo/ui/components/base/header/skeleton/header-button-skeleton'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import type { Nullable } from '@echo/utils/types/nullable'
import dynamic from 'next/dynamic'
import { type FunctionComponent } from 'react'

interface Props {
  style?: HeaderStyle
  user?: Nullable<User>
}

const HeaderButton = dynamic(
  () => import('@echo/ui/components/base/header/header-button').then((mod) => mod.HeaderButton),
  { ssr: false, loading: () => <HeaderButtonSkeleton /> }
)

export const Header: FunctionComponent<Props> = ({ style = HeaderStyle.Default, user }) => {
  if (style === HeaderStyle.Plain) {
    return (
      <HeaderLayout>
        <InternalLink path={'/'}>
          <EchoLogoSvg width={144} />
        </InternalLink>
      </HeaderLayout>
    )
  }

  return (
    <HeaderLayout>
      <InternalLink path={'/'}>
        <EchoLogoSvg width={144} />
      </InternalLink>
      <HeaderSearch />
      <HeaderButton user={user} />
    </HeaderLayout>
  )
}
