import React, { FunctionComponent, SVGProps } from 'react'

export const ShareIconSvg: FunctionComponent<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg {...props} viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.2905 18C1.82644 18 1.42903 17.8396 1.09828 17.5189C0.767529 17.1982 0.602436 16.8131 0.602998 16.3636V7.36364C0.602998 6.91364 0.768373 6.52827 1.09912 6.20754C1.42987 5.88682 1.827 5.72673 2.2905 5.72727H4.82175V7.36364H2.2905V16.3636H12.4155V7.36364H9.88425V5.72727H12.4155C12.8796 5.72727 13.277 5.88764 13.6077 6.20836C13.9385 6.52909 14.1036 6.91418 14.103 7.36364V16.3636C14.103 16.8136 13.9376 17.199 13.6069 17.5197C13.2761 17.8405 12.879 18.0005 12.4155 18H2.2905ZM6.50925 12.2727V3.12954L5.15925 4.43864L3.978 3.27273L7.353 0L10.728 3.27273L9.54675 4.43864L8.19675 3.12954V12.2727H6.50925Z"
        fill="#EFF427"
      />
    </svg>
  )
}
