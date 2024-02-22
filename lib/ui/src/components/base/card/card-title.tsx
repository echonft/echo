import { classes } from '@echo/ui/helpers/classes'
import { type FunctionComponent } from 'react'

interface Props {
  label: string
}

export const CardTitle: FunctionComponent<Props> = ({ label }) => {
  return <p className={classes('prose-label-sm', 'text-white', 'truncate')}>{label}</p>
}
