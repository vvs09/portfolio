import React from 'react';
import clsx from 'clsx';

function Separator({ className = '', ...props }) {
  return (
    <div
      className={clsx('h-px w-full my-12 bg-border', className)}
      {...props}
    />
  );
}

export default Separator;
