import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface BannerProps {
  src: string
}

export const Banner: FunctionComponent<BannerProps> = ({ src }) => {
  return (
    <div
      style={{ backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${src}')` }}
      className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', 'h-64')}
    />
  )
}
