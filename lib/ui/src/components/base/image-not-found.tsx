import { EchoIconSvg } from '@echo/ui/components/base/svg/echo-icon-svg'
import type { WithClassNameProps } from '@echo/ui/types/props/with-class-name-props'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props extends WithClassNameProps {
  height: number
  width: number
}

export const ImageNotFound: FunctionComponent<Props> = ({ height, width, className }) => {
  return (
    <div
      className={clsx(
        'flex',
        'items-center',
        'justify-center',
        'text-yellow-500',
        'bg-imageFilter',
        'bg-center',
        'bg-no-repeat',
        'bg-contain',
        className
      )}
      style={{ height, width }}
    >
      <EchoIconSvg className={clsx()} width={Math.floor(0.5 * width)} />
      <div
        className={clsx(
          'absolute',
          'inset-0',
          'bg-imageFilter',
          'bg-center',
          'bg-no-repeat',
          'bg-contain',
          'mix-blend-multiply',
          className
        )}
      />
    </div>
  )
}
