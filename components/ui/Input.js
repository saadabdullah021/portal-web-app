'use client';

export default function Input({ 
  label, 
  type = 'text', 
  name, 
  placeholder, 
  required = false, 
  className = '',
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        className={`
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
