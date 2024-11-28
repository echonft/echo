'use client'
import { HeaderLayout } from '@echo/ui/components/base/header/header-layout'
import { HeaderSearch } from '@echo/ui/components/base/header/header-search'
import { HeaderButtonSkeleton } from '@echo/ui/components/base/header/skeleton/header-button-skeleton'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { EchoLogoSvg } from '@echo/ui/components/base/svg/echo-logo-svg'
import { HeaderStyle } from '@echo/ui/constants/header-style'
import dynamic from 'next/dynamic'
import { type FunctionComponent } from 'react'

interface Props {
  options?: HeaderStyle
}

const HeaderButton = dynamic(
  () => import('@echo/ui/components/base/header/header-button').then((mod) => mod.HeaderButton),
  { ssr: false, loading: () => <HeaderButtonSkeleton /> }
)

const HeaderWalletStatusManager = dynamic(
  () => import('@echo/ui/components/base/header/wallet-status-manager').then((mod) => mod.WalletStatusManager),
  { ssr: false, loading: () => null }
)

const WalletChainManager = dynamic(
  () => import('@echo/ui/components/base/wallet/wallet-chain-manager').then((mod) => mod.WalletChainManager),
  { ssr: false, loading: () => null }
)

export const Header: FunctionComponent<Props> = ({ options = HeaderStyle.Default }) => {
  if (options === HeaderStyle.Plain) {
    return (
      <HeaderLayout>
        <InternalLink path={'/'}>
          <EchoLogoSvg height={44} />
        </InternalLink>
      </HeaderLayout>
    )
  }

  return (
    <HeaderLayout>
      <InternalLink path={'/'}>
        <EchoLogoSvg height={44} />
      </InternalLink>
      <HeaderSearch />
      <HeaderButton />
      <HeaderWalletStatusManager />
      <WalletChainManager />
    </HeaderLayout>
  )
}
