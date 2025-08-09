import React from 'react';
import clsx from 'clsx';

function Card({ className = '', children, ...props }) {
  return (
    <div className={clsx('rounded-2xl border bg-card text-card-foreground shadow', className)} {...props}>
      {children}
    </div>
  );
}

function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={clsx('px-6 py-4 border-b', className)} {...props}>
      {children}
    </div>
  );
}

function CardTitle({ className = '', children, ...props }) {
  return (
    <h3 className={clsx('text-lg font-medium', className)} {...props}>
      {children}
    </h3>
  );
}

function CardContent({ className = '', children, ...props }) {
  return (
    <div className={clsx('px-6 py-4', className)} {...props}>
      {children}
    </div>
  );
}

export { Card, CardHeader, CardContent, CardTitle };
export default Card;
