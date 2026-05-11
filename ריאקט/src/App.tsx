// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Home from "./pages/home";
// import StudentLogin from "./pages/StudentLogin";
// import StaffLogin from "./pages/StaffLogin";
// import Classes from "./pages/Classes";
// import ChangePassword from "./pages/ChangePassword";
// import ClassDetail from "./pages/ClassDetail";
// import StudentClassroom from "./pages/StudentClassroom";
// import StaffClassroom from "./pages/StaffClassroom";
// import ClassDetail1 from "./pages/classDetailTeacher";
// import AllClasses from "./pages/AllClasses"
// //import ClassDetail from "./pages/ClassDetail";
// // יצירת client אחד לכל האפליקציה
// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>
//         {/* תפריט ניווט */}
//         <nav style={{ padding: "10px", background: "#f4f4f4", marginBottom: "20px" }}>
//           <Link to="/" style={{ marginLeft: "10px",color: "#7281df" }}>בית</Link>
//           <Link to="/StudentLogin" style={{ marginLeft: "10px", color: "#7281df"}}>כניסת תלמידים</Link>
//           <Link to="/StaffLogin" style={{ marginLeft: "10px",color: "#7281df" }}>כניסת צוות</Link>
//           <Link to="/Classes" style={{ marginLeft: "10px",color: "#7281df" }}>הוספת כיתה</Link>
//           {/* <Link to="/allClasses" style={{ marginLeft: "10px",color: "#7281df" }}>הוספת </Link> */}

//           <Link to="/StudentClassroom" style={{ marginLeft: "10px" ,color: "#7281df"}}>פרטי כיתה </Link>
// <Link to="/StaffClassroom" style={{ marginLeft: "10px",color: "#7281df" }}>הכיתות שלי (צוות)</Link>
//         </nav>

//         <Routes>
//           {/* <Route path="/class/:id" element={<ClassDetail />} /> */}
//           <Route path="/ClassDetail/:classId" element={<ClassDetail />} />
//            <Route path="/classDetailTeacher/:classId" element={<ClassDetail1 />} />
//            <Route path="/home" element={<Home />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/StudentLogin" element={<StudentLogin />} />
//           <Route path="/StaffLogin" element={<StaffLogin />} />
//           <Route path="/AllClasses" element={<AllClasses/>} />

//           <Route path="/Classes" element={<Classes />} />
//           <Route path="/StaffClassroom" element={<StaffClassroom />} />
//           <Route path="/ChangePassword" element={<ChangePassword />} />
// <Route path="/StudentClassroom" element={<StudentClassroom />} />
// <Route path="/StudentClassroom/:id" element={<StudentClassroom />} />        </Routes>
//       </BrowserRouter>
//     </QueryClientProvider>
//   );
// }

// export default App;
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; // ייבוא ה-Provider
import { store } from "./app/store";    // ייבוא ה-Store שהקמנו

import Home from "./pages/home";
import StudentLogin from "./pages/StudentLogin";
import StaffLogin from "./pages/StaffLogin";
import Classes from "./pages/Classes";
import ChangePassword from "./pages/ChangePassword";
import ClassDetail from "./pages/ClassDetail";
import StudentClassroom from "./pages/StudentClassroom";
import StaffClassroom from "./pages/StaffClassroom";
import ClassDetail1 from "./pages/classDetailTeacher";
import AllClasses from "./pages/AllClasses";

const queryClient = new QueryClient();
function AdminRoute({ children }: { children: React.ReactNode }) {
    const userType = sessionStorage.getItem("user_type")
    
    if (!userType) {
        // לא מחובר כלל → לדף התחברות
        window.location.href = "/StaffLogin"
        return null
    }
    
    if (userType !== "admin") {
        // מחובר אבל לא מנהל → הודעת שגיאה
        return (
            <div dir="rtl" className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">אין הרשאת גישה</h1>
                    <p className="text-gray-500 mt-2">עמוד זה מיועד למנהלים בלבד</p>
                    <button 
                        onClick={() => window.location.href = "/AllClasses"}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        חזרה לעמוד שלי
                    </button>
                </div>
            </div>
        )
    }
    
    return <>{children}</>
}
function App() {
  return (
    // עטיפת כל האפליקציה ב-Redux Provider
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* תפריט ניווט */}
          <nav style={{ padding: "10px", background: "#f4f4f4", marginBottom: "20px" }}>
            <Link to="/" style={{ marginLeft: "10px", color: "#7281df" }}>בית</Link>
            <Link to="/StudentLogin" style={{ marginLeft: "10px", color: "#7281df" }}>כניסת תלמידים</Link>
            <Link to="/StaffLogin" style={{ marginLeft: "10px", color: "#7281df" }}>כניסת צוות</Link>
            <Link to="/Classes" style={{ marginLeft: "10px", color: "#7281df" }}>הוספת כיתה</Link>
            <Link to="/StudentClassroom" style={{ marginLeft: "10px", color: "#7281df" }}>פרטי כיתה</Link>
            <Link to="/StaffClassroom" style={{ marginLeft: "10px", color: "#7281df" }}>הכיתות שלי (צוות)</Link>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/StudentLogin" element={<StudentLogin />} />
            <Route path="/StaffLogin" element={<StaffLogin />} />
            <Route path="/AllClasses" element={<AllClasses />} />
            {/* <Route path="/Classes" element={<Classes />} /> */}
            <Route path="/Classes" element={
    <AdminRoute>
        <Classes />
    </AdminRoute>
} />
            <Route path="/StaffClassroom" element={<StaffClassroom />} />
            <Route path="/ChangePassword" element={<ChangePassword />} />
            <Route path="/StudentClassroom" element={<StudentClassroom />} />
            <Route path="/StudentClassroom/:id" element={<StudentClassroom />} />
            <Route path="/ClassDetail/:classId" element={<ClassDetail />} />
            <Route path="/classDetailTeacher/:classId" element={<ClassDetail1 />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;