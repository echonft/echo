import { Svg, SvgProps } from './svg'
import { FunctionComponent } from 'react'

export const QuestionMarkIconSvg: FunctionComponent<SvgProps> = (props) => {
  return (
    <Svg viewBoxWidth={20} viewBoxHeight={20} {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM8.66477 11.7974C8.66477 11.8803 8.73193 11.9474 8.81477 11.9474H10.399C10.4818 11.9474 10.549 11.8803 10.549 11.7974V11.7784C10.5523 11.4536 10.5937 11.1802 10.6733 10.9581C10.7562 10.736 10.8804 10.5405 11.0462 10.3714C11.2152 10.2024 11.4306 10.04 11.6925 9.88423C12.004 9.69863 12.2741 9.49148 12.5028 9.26278C12.7315 9.03078 12.9089 8.76562 13.0348 8.46733C13.1641 8.16572 13.2287 7.82102 13.2287 7.43324C13.2287 6.85322 13.0845 6.35772 12.7962 5.94673C12.5078 5.53575 12.1101 5.22254 11.603 5.0071C11.0959 4.78835 10.5125 4.67898 9.85298 4.67898C9.25308 4.67898 8.70455 4.78669 8.20739 5.00213C7.71023 5.21425 7.31084 5.53741 7.00923 5.97159C6.74736 6.3457 6.59293 6.80725 6.54593 7.35625C6.53395 7.49626 6.64777 7.61222 6.78829 7.61222H8.31935C8.45386 7.61222 8.5615 7.50504 8.58579 7.37274C8.61674 7.2042 8.67455 7.05698 8.75923 6.93111C8.88186 6.7455 9.0393 6.6063 9.23153 6.51349C9.42377 6.41738 9.6276 6.36932 9.84304 6.36932C10.0651 6.36932 10.2673 6.41572 10.4496 6.50852C10.6352 6.60133 10.7827 6.7339 10.892 6.90625C11.0014 7.0786 11.0561 7.27912 11.0561 7.50781C11.0561 7.72325 11.008 7.9188 10.9119 8.09446C10.8158 8.26681 10.6866 8.42424 10.5241 8.56676C10.3617 8.70928 10.1778 8.84683 9.9723 8.9794C9.69721 9.15175 9.46188 9.34399 9.26633 9.55611C9.07079 9.76823 8.92164 10.0466 8.81889 10.3913C8.71946 10.736 8.66809 11.1984 8.66477 11.7784V11.7974ZM8.79901 14.7812C9.03433 15.0133 9.31771 15.1293 9.64915 15.1293C9.86127 15.1293 10.0568 15.0762 10.2358 14.9702C10.4148 14.8608 10.5589 14.7166 10.6683 14.5376C10.781 14.3554 10.839 14.1548 10.8423 13.9361C10.839 13.6113 10.718 13.3329 10.4794 13.1009C10.2408 12.8688 9.96402 12.7528 9.64915 12.7528C9.31771 12.7528 9.03433 12.8688 8.79901 13.1009C8.567 13.3329 8.45265 13.6113 8.45597 13.9361C8.45265 14.2642 8.567 14.5459 8.79901 14.7812Z"
        fill="currentColor"
      />
    </Svg>
  )
}
