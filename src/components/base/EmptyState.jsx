export default function EmptyState({ children }) {
  return (
    <div className="text-center py-20 px-6">
      <p className="text-gray-400 text-base">{children}</p>
    </div>
  );
}
