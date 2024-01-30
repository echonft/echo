import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const CollectionsPageTitle: FunctionComponent<Props> = ({ title }) => (
  <span className={clsx('prose-header-lg', 'text-white')}>{title}</span>
)
