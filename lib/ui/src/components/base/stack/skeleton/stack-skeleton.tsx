import { StackLayout } from '@echo/ui/components/base/stack/layout/stack-layout'
import { type FunctionComponent } from 'react'

export const StackSkeleton: FunctionComponent = () => {
  return <StackLayout loading={true} />
}
