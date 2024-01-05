import type { AuthUser } from '@echo/model/types/auth-user'
import { HeaderSelector } from '@echo/ui/components/layout/header/header-selector'
import { MainSectionLayout } from '@echo/ui/components/layout/main-section-layout'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  user?: AuthUser
  headerVariants?: {
    transparent?: boolean
    logoOnly?: boolean
  }
}

export const PageLayout: FunctionComponent<PropsWithChildren<Props>> = ({ user, headerVariants, children }) => {
  const transparent = Boolean(headerVariants?.transparent)
  const logoOnly = Boolean(headerVariants?.logoOnly)
  return (
    <div className={clsx('w-full', 'h-full', 'overflow-y-auto', transparent ? 'relative' : 'bg-dark-500')}>
      <HeaderSelector user={user} transparent={transparent} logoOnly={Boolean(logoOnly)} />
      <MainSectionLayout>{children}</MainSectionLayout>
    </div>
  )
}
