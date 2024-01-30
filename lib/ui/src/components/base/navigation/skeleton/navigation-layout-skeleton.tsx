import { PaddedContainer } from '@echo/ui/components/base/layout/padded-container'
import { NavigationPillsSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-pills-skeleton'
import { type FunctionComponent, type PropsWithChildren } from 'react'

interface Props {
  pillsCount: number
}

export const NavigationLayoutSkeleton: FunctionComponent<PropsWithChildren<Props>> = ({ pillsCount, children }) => {
  return (
    <PaddedContainer>
      <NavigationPillsSkeleton count={pillsCount} />
      {children}
    </PaddedContainer>
  )
}
