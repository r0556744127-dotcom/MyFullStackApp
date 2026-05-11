import { Trash2 } from "lucide-react"
import type{ Student } from "./types"

type Props = {
    students: Student[]
    classId: number
    onEdit: (student: Student) => void
    onDelete: (classId: number, studentId: number) => void
}

export default function staudenttable2({ students, classId, onEdit, onDelete }: Props) {
    if (students.length === 0) {
        return (
            <p className="text-center text-gray-400 py-4 text-sm">אין תלמידים רשומים</p>
        )
    }

    return (
        <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                    <th className="text-right px-4 py-2 font-medium">שם מלא</th>
                    <th className="text-right px-4 py-2 font-medium">ת.זהות</th>
                    <th className="text-right px-4 py-2 font-medium">אימייל</th>
                    <th className="px-4 py-2" />
                </tr>
            </thead>
            <tbody>
                {students.map((s, i) => (
                    <tr key={s.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 font-medium">{s.fullName}</td>
                        <td className="px-4 py-2 text-gray-500">{s.identityNumber}</td>
                        <td className="px-4 py-2 text-gray-500">{s.email}</td>
                        <td className="px-4 py-2 text-left flex gap-2">
                            <button onClick={() => onEdit(s)} className="text-amber-600 hover:text-amber-800">
                                ✏️
                            </button>
                            <button onClick={() => onDelete(classId, s.id)} className="text-red-400 hover:text-red-600">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
// import { Trash2 } from "lucide-react";

// export default function StudentsTable({
//   students,
//   onDelete,
//   onEdit
// }: any) {
//   if (students.length === 0) {
//     return (
//       <p className="text-center text-gray-400 py-4 text-sm">
//         אין תלמידים רשומים
//       </p>
//     );
//   }

//   return (
//     <table className="w-full text-sm">
//       <thead className="bg-gray-50 text-gray-500 text-xs">
//         <tr>
//           <th className="text-right px-4 py-2">שם מלא</th>
//           <th className="text-right px-4 py-2">ת.זהות</th>
//           <th className="text-right px-4 py-2">אימייל</th>
//           <th />
//         </tr>
//       </thead>

//       <tbody>
//         {students.map((s: any, i: number) => (
//           <tr key={s.id} className={i % 2 ? "bg-gray-50" : ""}>
//             <td className="px-4 py-2">{s.fullName}</td>
//             <td className="px-4 py-2">{s.identityNumber}</td>
//             <td className="px-4 py-2">{s.email}</td>

//             <td className="px-4 py-2 flex gap-2">
//               <button
//                 onClick={() => onEdit(s)}
//                 className="text-amber-600"
//               >
//                 ✏️
//               </button>

//               <button
//                 onClick={() => onDelete(s.id)}
//                 className="text-red-400"
//               >
//                 <Trash2 className="w-4 h-4" />
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }