import { AlertCircle } from "lucide-react";

type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div className="text-red-600 text-sm flex items-center gap-2">
      <AlertCircle size={16} />
      {message}
    </div>
  );
}