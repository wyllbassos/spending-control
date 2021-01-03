import React from 'react';

import { RegisterProvider } from './register';

interface HooksProps {
  children: React.ReactNode;
}

const Hooks: React.FC<HooksProps> = ({ children }: HooksProps) => {
  return <RegisterProvider>{children}</RegisterProvider>;
};

export default Hooks;
