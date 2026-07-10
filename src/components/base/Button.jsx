const variants = {
  primary:
    'bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-950 px-7 py-3 rounded-full text-sm font-semibold shadow-md hover:shadow-lg',
  ghost:
    'bg-transparent border-none text-primary text-xs font-semibold hover:underline p-0',
  icon:
    'rounded-full border-none flex items-center justify-center cursor-pointer',
};

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`cursor-pointer font-[inherit] transition-all duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
