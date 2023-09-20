import type { SvgProps } from '@echo/ui/components/base/svg/svg'
import { isNil } from 'ramda'

export function useSvgSize({
  viewBoxHeight,
  viewBoxWidth,
  width,
  height
}: SvgProps & { viewBoxWidth: number; viewBoxHeight: number }): { viewBox: string; width: number; height: number } {
  const viewBox = `0 0 ${viewBoxWidth} ${viewBoxHeight}`
  if (isNil(width)) {
    if (isNil(height)) {
      return { viewBox, width: viewBoxWidth, height: viewBoxHeight }
    }
    return { viewBox, width: Math.floor((height * viewBoxWidth) / viewBoxHeight), height }
  }
  if (isNil(height)) {
    return { viewBox, width, height: Math.floor((width * viewBoxHeight) / viewBoxWidth) }
  }
  return { viewBox, width, height }
}
