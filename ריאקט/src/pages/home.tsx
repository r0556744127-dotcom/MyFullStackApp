import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { homeService } from "../services/homeService";
import HeroBanner from "../components/ui/HeroBanner";
import StatsGrid from "../components/ui/StatsGrid";
import LoginLinksGrid from "../components/ui/LoginLinksGrid";

export default function Home() {
  const [stats, setStats] = useState({ classes: 0 });
  const [displayName, setDisplayName] = useState("אורח");

  useEffect(() => {
    // טעינת שם המשתמש
    setDisplayName(homeService.getUserDisplayName());

    // טעינת סטטיסטיקות מהשרת
    homeService.getGeneralStats()
      .then(data => setStats({ classes: data.classesCount }))
      .catch(err => console.error("שגיאה במשיכת נתונים:", err));
  }, []);

  const cards = [
    {
      label: "כיתות פעילות",
      value: stats.classes,
      icon: Users,
      color: "from-indigo-500 to-purple-600",
      desc: "ניהול כיתות ותלמידים"
    }
  ];

  return (
    <div className="space-y-8 p-4" dir="rtl">
      <HeroBanner displayName={displayName} />
      <StatsGrid cards={cards} />
      <LoginLinksGrid />
    </div>
  );
}
// import { useState, useEffect } from "react"
// import { Users } from "lucide-react"
// import apiClient from "../api/apiClient"
// import HeroBanner from "../components/ui/HeroBanner"
// import StatsGrid from "../components/ui/StatsGrid"
// import LoginLinksGrid from "../components/ui/LoginLinksGrid"

// export default function Home() {
//   const [stats, setStats] = useState({ classes: 0 })
//   const [displayName, setDisplayName] = useState("אורח")

//   useEffect(() => {
//     try {
//       const studentSession = sessionStorage.getItem("student_session")
//       const staffSession = sessionStorage.getItem("staff_session")

//       if (studentSession) {
//         setDisplayName(JSON.parse(studentSession).full_name || "תלמיד/ה")
//       } else if (staffSession) {
//         setDisplayName(JSON.parse(staffSession).full_name || "")
//       }
//     } catch (e) {
//       console.error("שגיאה בפענוח נתוני המשתמש", e)
//     }
//   }, [])

//   useEffect(() => {
    
//     apiClient.get("/ClassRoom")
//       .then(res => setStats({ classes: Array.isArray(res.data) ? res.data.length : 0 }))
//       .catch(err => console.error("שגיאה במשיכת כיתות:", err))
//   }, [])

//   const cards = [
//     {
//       label: "כיתות פעילות",
//       value: stats.classes,
//       icon: Users,
//       color: "from-indigo-500 to-purple-600",
//       desc: "ניהול כיתות ותלמידים"
//     }
//   ]

//   return (
//     <div className="space-y-8 p-4" dir="rtl">
//       <HeroBanner displayName={displayName} />
//       <StatsGrid cards={cards} />
//       <LoginLinksGrid />
//     </div>
//   )
// }