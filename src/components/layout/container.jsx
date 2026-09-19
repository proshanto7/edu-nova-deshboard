import React from "react";

function Container({ children, className }) {
  return (
    <div
      className={`mx-auto w-full max-w-295 overflow-hidden px-2.5 md:px-0 ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
