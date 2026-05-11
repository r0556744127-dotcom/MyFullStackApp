import { Outlet, Link } from "react-router-dom"

export default function PublicLayout() {
  return (
    <>
      <nav className="p-3 bg-gray-100 flex gap-4 text-sm">
        <Link to="/">בית</Link>
        <Link to="/StudentLogin">תלמידים</Link>
        <Link to="/StaffLogin">צוות</Link>
        <Link to="/Classes">כיתות</Link>
        <Link to="/AllClasses">כל הכיתות</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}