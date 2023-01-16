import { SVGProps } from 'react';

// Resources:
// https://react-svgr.com/playground/
// https://tablericons.com/
const Sprout = (props: SVGProps<SVGSVGElement>) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  className="icon icon-tabler icon-tabler-seeding"
  height="80%"
  viewBox="0 0 24 24"
  strokeWidth={0.9}
  stroke="#000"
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
  {...props}
>
  <path d="M0 0h24v24H0z" stroke="none" />
  <path d="M12 10a6 6 0 0 0-6-6H3v2a6 6 0 0 0 6 6h3M12 14a6 6 0 0 1 6-6h3v1a6 6 0 0 1-6 6h-3M12 20V10" />
</svg>
)

export default Sprout;