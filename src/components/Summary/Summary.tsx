import React, { type PropsWithChildren } from 'react';

type Props = {
  title: string;
  folded?: boolean;
} & PropsWithChildren;

const Summary: React.FC<Props> = ({ title, folded = false, children }) => {
  return (
    <details className="story" open={!folded}>
      <summary>{title}</summary>
      {children}
    </details>
  );
};

export default Summary;
