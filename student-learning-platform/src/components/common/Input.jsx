const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  className = '',
  ...props
}) => {
  const hasError = !!error;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          className={`w-full px-4 py-3 ${Icon ? 'pl-10' : ''} bg-white border-2 rounded-lg
                     focus:outline-none placeholder:text-gray-400 transition-all
                     ${hasError
                       ? 'border-error-600 focus:border-error-600 focus:ring-2 focus:ring-error-500 focus:ring-opacity-20'
                       : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20'
                     }
                     ${className}`}
          {...props}
        />
        {Icon && (
          <Icon className={`absolute left-3 top-3.5 w-5 h-5 ${hasError ? 'text-error-600' : 'text-gray-400'}`} />
        )}
      </div>

      {error && (
        <p className="text-sm text-error-600">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
