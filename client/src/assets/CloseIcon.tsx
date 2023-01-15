import { SVGProps } from 'react';

// Resource: https://tablericons.com/
const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-x"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    strokeWidth={3.0}
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

export default CloseIcon;
