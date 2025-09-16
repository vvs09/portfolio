import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

const TooltipProvider = ({ children }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger = React.forwardRef(function TooltipTrigger(
  { asChild = false, children, ...props },
  ref
) {
  if (asChild) {
    return React.cloneElement(children, { ref, ...props });
  }
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});

const TooltipContent = React.forwardRef(function TooltipContent(
  { className = '', children, ...props },
  ref
) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    
    if (!trigger || !content) return;

    const showTooltip = () => setIsVisible(true);
    const hideTooltip = () => setIsVisible(false);

    trigger.addEventListener('mouseenter', showTooltip);
    trigger.addEventListener('mouseleave', hideTooltip);
    trigger.addEventListener('focus', showTooltip);
    trigger.addEventListener('blur', hideTooltip);

    return () => {
      trigger.removeEventListener('mouseenter', showTooltip);
      trigger.removeEventListener('mouseleave', hideTooltip);
      trigger.removeEventListener('focus', showTooltip);
      trigger.removeEventListener('blur', hideTooltip);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      className={clsx(
        'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg',
        'animate-in fade-in-0 zoom-in-95 duration-200',
        className
      )}
      {...props}
    >
      {children}
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
    </div>
  );
});

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };