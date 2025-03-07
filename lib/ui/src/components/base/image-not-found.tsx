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
        'relative',
        'text-yellow-500',
        'bg-cardImageGradient',
        'bg-center',
        'bg-no-repeat',
        'bg-contain',
        className
      )}
      style={{ height, width }}
    >
      <EchoIconSvg width={Math.floor(0.5 * width)} />
      <div
        className={clsx(
          'absolute',
          'inset-0',
          'bg-cardImageGradient',
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
