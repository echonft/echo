'use client'
import { Banner } from '@echo/ui/components/base/banner'
import { PaddedLayout } from '@echo/ui/components/base/layout/padded-layout'
import { useComponentWidth } from '@echo/ui/hooks/use-component-width'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  bannerUrl?: Nullable<string>
}

export const ProfileLayout: FunctionComponent<PropsWithChildren<Props>> = ({ bannerUrl, children }) => {
  const { ref, width } = useComponentWidth<HTMLDivElement>()
  return (
    <div className={clsx('w-full', 'h-full', 'relative')} ref={ref}>
      <Banner src={bannerUrl} width={width} />
      <PaddedLayout className={clsx('z-2')}>
        <div className={clsx('flex', 'flex-col', 'gap-10', 'pt-16')}>{children}</div>
      </PaddedLayout>
    </div>
  )
}
