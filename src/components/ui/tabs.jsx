import React, { createContext, useContext, useState } from 'react';
import clsx from 'clsx';

const TabsContext = createContext();

export function Tabs({ defaultValue, children, ...props }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className = '', children, ...props }) {
  return (
    <div
      className={clsx(
        'inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({ value, className = '', children, ...props }) {
  const { value: active, setValue } = useContext(TabsContext);
  const selected = active === value;
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-primary',
        selected
          ? 'bg-primary text-primary-foreground shadow'
          : 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        className
      )}
      onClick={() => setValue(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = '', children, ...props }) {
  const { value: active } = useContext(TabsContext);
  if (active !== value) return null;
  return (
    <div className={clsx('mt-2', className)} {...props}>
      {children}
    </div>
  );
}
