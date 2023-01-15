import { SVGProps } from 'react';

// Resource: https://tablericons.com/
const CommentIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-message-circle"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#a9a9a9"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="m3 20 1.3-3.9A9 8 0 1 1 7.7 19L3 20M12 12v.01M8 12v.01M16 12v.01" />
  </svg>
)

export default CommentIcon;
