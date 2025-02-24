import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";

export default function FlexyWorksIcon() {
  return (
    <SvgIcon sx={{ height: 21, width: 100, mr: 2 }}>
      <svg
        width={100}
        height={21}
        viewBox="0 0 100 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle to represent a flexible work environment */}
        <circle
          cx="10"
          cy="10"
          r="9"
          stroke="#00D3AB"
          strokeWidth="2"
          fill="none"
        />

        {/* Stylized "F" letter to represent Flexy */}
        <path
          d="M16,7 L16,14 L13,14 L13,11 L10,11 L10,14 L7,14 L7,7 L10,7 L10,10 L13,10 L13,7 Z"
          fill="#4876EF"
        />

        {/* Arrows on the sides to represent the "works" aspect, signifying movement or collaboration */}
        <path d="M2,10 L5,7 L5,13 L2,10 Z" fill="#B4C0D3" />
        <path d="M18,10 L21,7 L21,13 L18,10 Z" fill="#B4C0D3" />
      </svg>
    </SvgIcon>
  );
}
