import React from "react";

interface Props {
  children: React.ReactNode;
  // otp: React.ReactNode
}

const layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default layout;
