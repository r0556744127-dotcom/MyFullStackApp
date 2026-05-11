type LoginInputProps = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function LoginInput({ type = "text", placeholder, value, onChange }: LoginInputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-slate-200 rounded-xl text-right focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  );
}