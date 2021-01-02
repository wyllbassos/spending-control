import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface TooltipProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  className = '',
  children,
}: TooltipProps) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
