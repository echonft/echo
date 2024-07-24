import { TabSkeleton } from '@echo/ui/components/base/navigation/tabs/skeleton/tab-skeleton'
import { map, pipe, range } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  count: number
}

export const TabsSkeleton: FunctionComponent<Props> = ({ count }) => {
  return (
    <div className={'tab-list'}>
      {pipe(
        range,
        map((index) => <TabSkeleton key={index} />)
      )(0, count)}
    </div>
  )
}
