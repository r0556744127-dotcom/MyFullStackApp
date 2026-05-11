import { GraduationCap, LogIn } from "lucide-react";
import LoginInput from "./LoginInput";
import ErrorMessage from "./ErrorMessage";


type LoginCardProps = {
  title: string
  subtitle: string

  identityNumber: string
  password: string
  error: string
  loading: boolean

  onIdentityChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLogin: () => Promise<void>
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function LoginCardStaff({
  identityNumber,
  password,
  error,
  loading,
  onIdentityChange,
  onPasswordChange,
  onLogin,
}: LoginCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">כניסה לצוות</h1>
      </div>

      <div className="space-y-4">
        <LoginInput
          placeholder="מספר זהות"
          value={identityNumber}
          onChange={onIdentityChange}
        />
        <LoginInput
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={onPasswordChange}
        />

        <ErrorMessage message={error} />

        <button
          onClick={onLogin}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-12 font-semibold flex items-center justify-center gap-2 disabled:bg-slate-400"
        >
          <LogIn className="w-5 h-5" />
          {loading ? "בודק..." : "כניסה למרחב"}
        </button>
      </div>
    </div>
  );
}