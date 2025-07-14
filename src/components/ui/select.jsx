
export function Select({ children, onValueChange }) {
  return (
    <select onChange={e => onValueChange(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
      {children}
    </select>
  );
}
export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
