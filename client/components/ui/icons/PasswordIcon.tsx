interface IconProps {
  size?: number | string;
}
export const Password = ({ size = 20 }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.5001 16L17.0249 12.6038"
        stroke="white"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.5V14"
        stroke="white"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 16L6.96895 12.6124"
        stroke="white"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 8C6.6 16 17.4 16 21 8"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
