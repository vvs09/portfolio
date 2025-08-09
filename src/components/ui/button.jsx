import React from 'react';
import clsx from 'clsx';

const base =
  'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-primary disabled:opacity-50 disabled:pointer-events-none';
const variants = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};
const sizes = {
  default: 'h-10 px-4 py-2',
  lg: 'h-12 px-6',
  sm: 'h-9 px-3',
  icon: 'h-10 w-10',
};

const Button = React.forwardRef(function Button(
  { className = '', variant = 'default', size = 'default', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
});

export default Button;
