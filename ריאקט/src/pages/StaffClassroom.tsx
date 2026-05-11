import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { classService } from "../services/classService";
import ClassList from "../components/ui/ClassList";

export default function StaffClassroom() {
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionResult = classService.getStaffSession();

    // טיפול בחסימת גישה או חוסר בסשן
    if (sessionResult.error === "access_denied") {
      alert("גישה חסומה");
      navigate("/");
      return;
    }
    
    if (sessionResult.error) {
      navigate("/StaffLogin");
      return;
    }

    const teacherId = sessionResult.data?.id || sessionResult.data?.Id;

    if (teacherId) {
      classService.getClassesByTeacher(teacherId)
        .then((data) => setClasses(data))
        .catch((err) => console.error("שגיאה בטעינת כיתות:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="p-10 text-center font-bold">
        טוען את הכיתות שלך...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 text-right" dir="rtl">
      <h1 className="text-2xl font-black mb-6 border-b pb-4 text-slate-800">
        הכיתות שלי
      </h1>

      <ClassList classes={classes} />
    </div>
  );
}
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import apiClient from "@/api/apiClient";

// import ClassList from "../components/ui/ClassList";

// export default function StaffClassroom() {
//   const [classes, setClasses] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const session = sessionStorage.getItem("staff_session");
//     const userType = sessionStorage.getItem("user_type");

//     if (userType === "student") {
//       alert("גישה חסומה");
//       navigate("/");
//       return;
//     }

//     if (!session) {
//       navigate("/StaffLogin");
//       return;
//     }

//     const staffData = JSON.parse(session);
//     const teacherId = staffData.id || staffData.Id;

//     if (teacherId) {
//       apiClient
//         .get(`/ClassRoom/teacher/${teacherId}`)
//         .then((res) => setClasses(res.data || []))
//         .finally(() => setLoading(false));
//     }
//   }, [navigate]);

//   if (loading)
//     return (
//       <div className="p-10 text-center font-bold">
//         טוען את הכיתות שלך...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white p-4 md:p-8 text-right" dir="rtl">
//       <h1 className="text-2xl font-black mb-6 border-b pb-4 text-slate-800">
//         הכיתות שלי
//       </h1>

//       <ClassList classes={classes} />
//     </div>
//   );
// }