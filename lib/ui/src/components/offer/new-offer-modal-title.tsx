import clsx from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  title: string
}

export const NewOfferModalTitle: FunctionComponent<Props> = ({ title }) => (
  <span className={clsx('text-white', 'text-center', 'prose-header-sm-semi')}>{title}</span>
)
