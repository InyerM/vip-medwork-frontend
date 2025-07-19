import { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  as?: 'button' | 'a' | 'link';
  href?: string;
}

export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className,
  disabled = false,
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    'px-4 py-2 rounded-xl transition-all duration-200 font-medium focus:outline-none cursor-pointer';
  const variantStyles = {
    primary:
      'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400',
    secondary:
      'bg-gray-800 text-indigo-600 border border-indigo-600 hover:bg-gray-800/70 disabled:bg-gray-200 disabled:text-gray-400',
    danger:
      'bg-red-800/70 text-white hover:bg-red-700 disabled:bg-red-400',
  };

  const classes = clsx(baseStyles, variantStyles[variant], className, {
    'pointer-events-none opacity-50': disabled,
  });

  if (as === 'link' && href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (as === 'a') {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      disabled={disabled}
      type={props.type || 'button'}
      {...props}
    >
      {children}
    </button>
  );
}