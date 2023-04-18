import { FunctionComponent, SVGProps } from 'react'

export interface EchoIconSvgProps extends SVGProps<SVGSVGElement> {
  color: 'yellow' | 'black'
}

export const EchoIconSvg: FunctionComponent<EchoIconSvgProps> = ({ color, ...rest }) => {
  return (
    <svg {...rest} viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.36318 3.65034C6.13334 0.424415 2.23623 -0.91412 0.660567 0.659638C-0.915098 2.2334 0.425058 6.12579 3.64928 9.35171C6.87351 12.5776 10.7762 13.9162 12.3519 12.3368C13.9276 10.7631 12.5874 6.87626 9.36318 3.65034ZM3.11659 6.53463C3.09976 6.33301 3.13902 6.17619 3.23995 6.06978C3.63246 5.67774 4.77636 6.19299 5.7969 7.2123C6.81744 8.2316 7.32771 9.37411 6.9408 9.76615C6.83426 9.87256 6.67165 9.91177 6.47539 9.88936C5.86419 9.45812 5.25299 8.94287 4.65861 8.34921C4.06423 7.75555 3.54835 7.13949 3.11659 6.53463ZM7.28285 10.4158C7.16509 10.343 7.04173 10.2702 6.91837 10.1918C7.41182 10.3318 7.81555 10.2982 8.05105 10.063C8.63422 9.48052 7.97816 7.87316 6.58193 6.47862C5.1857 5.08408 3.57639 4.42882 2.99322 5.01127C2.7465 5.2577 2.72407 5.68334 2.87547 6.19299C2.77454 6.03618 2.67361 5.87936 2.58389 5.72815C2.29791 4.94967 2.30352 4.2888 2.668 3.92477C3.43621 3.15749 5.4941 3.97517 7.26603 5.74495C9.03795 7.51473 9.85101 9.57013 9.08841 10.3374C8.72394 10.6958 8.06227 10.7014 7.28285 10.4158ZM8.43796 10.9927C9.20617 11.1775 9.84541 11.0991 10.2323 10.7126C11.208 9.73815 10.2211 7.17309 8.02863 4.98327C5.83615 2.79345 3.26798 1.80775 2.29231 2.78225C1.9054 3.16869 1.8269 3.80715 2.01194 4.57443C1.50728 3.34231 1.47924 2.2894 2.04558 1.72374C3.15584 0.614834 6.12773 1.77975 8.67908 4.33361C11.2304 6.88746 12.4024 9.85016 11.2921 10.9591C10.7258 11.5247 9.67158 11.4911 8.43796 10.9927Z"
        fill={color === 'black' ? '#070707' : '#AEB309'}
      />
    </svg>
  )
}
