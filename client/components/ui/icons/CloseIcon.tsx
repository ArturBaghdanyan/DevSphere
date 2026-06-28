interface IconProps {
  size?: number | string;
}
export const Close = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.88477 18.6795L14.0012 13M14.0012 13L20.1175 7.32047M14.0012 13L7.88477 7.32047M14.0012 13L20.1175 18.6795"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
