import { NavigationPillsLayout } from '@echo/ui/components/base/navigation/navigation-pills-layout'
import { NavigationPillSkeleton } from '@echo/ui/components/base/navigation/skeleton/navigation-pill-skeleton'
import { map, pipe, range } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  count: number
}

export const NavigationPillsSkeleton: FunctionComponent<Props> = ({ count }) => {
  return (
    <NavigationPillsLayout>
      {pipe(
        range,
        map((index) => <NavigationPillSkeleton key={index} />)
      )(0, count)}
    </NavigationPillsLayout>
  )
}
