export default function Badge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-danger text-white text-[0.65rem] min-w-5 h-5 px-1.5 rounded-full font-bold leading-none ${className}`}
    >
      {children}
    </span>
  );
}
