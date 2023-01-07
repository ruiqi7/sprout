import { SVGProps } from 'react';

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-pencil"
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
    <path d="M4 20h4L18.5 9.5a1.5 1.5 0 0 0-4-4L4 16v4M13.5 6.5l4 4" />
  </svg>
)

export default EditIcon;
