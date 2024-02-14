import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const CollectionsPageTitle: FunctionComponent<Props> = ({ title }) => (
  <h2 className={classes('prose-header-lg', 'text-white', 'w-full', 'h-max')}>{title}</h2>
)
