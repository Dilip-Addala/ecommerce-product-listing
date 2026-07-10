export default function Select({
  label,
  value,
  onChange,
  children,
  className = '',
}) {
  return (
    <div className={`mb-5 last:mb-0 ${className}`}>
      {label && (
        <label className="block text-[0.7rem] font-bold text-gray-400 mb-2 uppercase tracking-widest">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className="w-full py-2.5 px-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50 cursor-pointer font-[inherit] text-gray-700 transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {children}
      </select>
    </div>
  );
}
