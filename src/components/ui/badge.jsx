import React from 'react';
import clsx from 'clsx';

const variants = {
  default: 'border-transparent bg-accent text-accent-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  outline: 'border border-input',
};

function Badge({ className = '', variant = 'default', ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export default Badge;
