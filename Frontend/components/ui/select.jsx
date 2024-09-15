'use client'

import React, { forwardRef } from 'react';

export const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`shadow appearance-none border text-black rounded w-full py-2 px-3 leading-tight focus:outline-none focus:ring-2  ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${props.disabled ? 'bg-gray-100' : 'bg-white'} ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

// Creating a new Button component
export const Button = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Creating new Select components
export const Select = forwardRef(({ children, ...props }, ref) => {
  return (
    <div className="relative" ref={ref} {...props}>
      {children}
    </div>
  );
});

Select.displayName = 'Select';

export const SelectTrigger = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      className={`flex justify-between items-center w-full px-4 py-2 text-left bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      ref={ref}
      {...props}
    >
      {children}
      <span className="ml-2">▼</span>
    </button>
  );
});

SelectTrigger.displayName = 'SelectTrigger';

export const SelectValue = forwardRef(({ className, ...props }, ref) => {
  return <span className={`block truncate ${className}`} ref={ref} {...props} />;
});

SelectValue.displayName = 'SelectValue';

export const SelectContent = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

SelectContent.displayName = 'SelectContent';

export const SelectItem = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

SelectItem.displayName = 'SelectItem';

export const Label = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';
