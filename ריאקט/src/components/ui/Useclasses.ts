import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import apiClient from "../../api/apiClient"
type Student = {
    id: number
    fullName: string
    identityNumber: string
    email: string
}

type Staff = {
    id: number
    fullName: string
    identityNumber: string
    email: string
    role: number
}

type ClassType = {
    id: number
    name: string
    color: string
    grade: string
    students: Student[]
}
import { validateStudent, validateStaff } from "./Classes.validators"
const extractGrade = (name: string): string => {
    const match = name.match(/[א-ת]/)
    return match ? match[0] : ""
}

export function useClasses() {
    const location = useLocation()
    // const navigate = useNavigate()

    const [classes, setClasses] = useState<ClassType[]>([])
    const [allStaff, setAllStaff] = useState<Staff[]>([])
    const [loading, setLoading] = useState(true)
    const [expandedGrades, setExpandedGrades] = useState<string[]>(["א"])
    const [expandedClasses, setExpandedClasses] = useState<number[]>([])

    // Modal visibility
    const [showClassForm, setShowClassForm] = useState(false)
    const [showStudentForm, setShowStudentForm] = useState(false)
    const [showStaffForm, setShowStaffForm] = useState(false)
    const [showStaffList, setShowStaffList] = useState(false)

    // Selected context
    const [selectedGrade, setSelectedGrade] = useState("")
    const [selectedClassId, setSelectedClassId] = useState<number | null>(null)
    const [editingStudent, setEditingStudent] = useState<Student | null>(null)
    const [editingClassId, setEditingClassId] = useState<number | null>(null)
    const [editClassName, setEditClassName] = useState("")

    useEffect(() => {
        fetchClasses()
        fetchStaff()
    }, [location.pathname])

    // --- Fetchers ---

    const fetchClasses = async () => {
        try {
            const res = await apiClient.get("/ClassRoom")
            const data = Array.isArray(res.data) ? res.data : []
            const mapped: ClassType[] = data.map((c: any) => ({
                id: c.id ?? c.Id,
                name: c.name ?? c.Name ?? "",
                color: c.color ?? c.Color ?? "#4F46E5",
                grade: extractGrade(c.name ?? c.Name ?? ""),
                students: []
            }))
            setClasses(mapped)
        } catch (err) {
            console.error("Error fetching classes:", err)
        } finally {
            setLoading(false)
        }
    }

    const fetchStaff = async () => {
        try {
            const res = await apiClient.get("/Staff")
            setAllStaff(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.error("Error fetching staff:", err)
        }
    }

    const fetchClassDetails = async (classId: number) => {
        try {
            const res = await apiClient.get(`/ClassRoom/${classId}`)
            const detail = res.data
            setClasses(prev =>
                prev.map(c =>
                    c.id === classId ? { ...c, students: detail.students ?? [] } : c
                )
            )
        } catch (err) {
            console.error(err)
        }
    }

    // --- Class Handlers ---

    const handleAddClass = async (data: Omit<ClassType, "id" | "students">) => {
        try {
            const created = await apiClient.post("/ClassRoom", data)
            const newClass = created.data
            setClasses(prev => [...prev, {
                id: newClass?.classId ?? Date.now(),
                name: data.name,
                color: data.color,
                grade: data.grade,
                students: []
            }])
            setShowClassForm(false)
        } catch {
            alert("שגיאה בשמירת כיתה")
        }
    }

    const handleDeleteClass = async (classId: number) => {
        if (!confirm("למחוק את הכיתה?")) return
        try {
            await apiClient.delete(`/ClassRoom/${classId}`)
            setClasses(prev => prev.filter(c => c.id !== classId))
        } catch {
            alert("שגיאה במחיקת כיתה")
        }
    }

    const handleUpdateClass = async (classId: number) => {
        try {
            await apiClient.put(`/ClassRoom/${classId}`, { name: editClassName })
            setClasses(prev =>
                prev.map(c => c.id === classId ? { ...c, name: editClassName } : c)
            )
            setEditingClassId(null)
            setEditClassName("")
        } catch {
            alert("שגיאה בעדכון שם הכיתה")
        }
    }

    // --- Student Handlers ---

const handleAddStudent = async (data: Omit<Student, "id">) => {
    const error = validateStudent(data)
    if (error) return alert(error)
    if (!selectedClassId) return alert("לא נבחרה כיתה")

    try {
        const res = await apiClient.post("/Student", {
            ...data,
            password: data.identityNumber,
            classRoomId: selectedClassId
        })

        const newStudent = res.data

        // ✅ עדכון מיידי של UI
        setClasses(prev =>
            prev.map(c =>
                c.id === selectedClassId
                    ? { ...c, students: [...c.students, newStudent] }
                    : c
            )
        )

        setShowStudentForm(false)
        setSelectedClassId(null)

    } catch {
        alert("שגיאה בשמירת תלמיד")
    }
}

    const handleUpdateStudent = async (id: number, data: { fullName: string; email: string }) => {
        try {
            await apiClient.put(`/Student/${id}`, {
                FullName: data.fullName,
                Email: data.email
            })
            setClasses(prev =>
                prev.map(cls => ({
                    ...cls,
                    students: cls.students.map(s =>
                        s.id === id ? { ...s, ...data } : s
                    )
                }))
            )
            setEditingStudent(null)
        } catch {
            alert("שגיאה בעדכון תלמיד")
        }
    }

    const handleDeleteStudent = async (classId: number, studentId: number) => {
            console.log("studentId:", studentId); // בדקי מה מגיע
        
            try {
            await apiClient.delete(`/Student/${studentId}`)
            
            setClasses(prev =>
                prev.map(cls =>
                    cls.id === classId
                        ? { ...cls, students: cls.students.filter(s => s.id !== studentId) }
                        : cls
                )
            )
        } catch {
            alert("שגיאה במחיקת תלמיד")
        }
    }

    // --- Staff Handlers ---

    const handleAddTeacher = async (data: Omit<Staff, "id">) => {
        const error = validateStaff(data)
        if (error) return alert(error)

        try {
            const payload = {
                FullName: data.fullName.trim(),
                Password: data.identityNumber.trim(),
                Role: 2,
                Classes: [],
                Lessons: [],
                IdentityNumber: data.identityNumber.trim(),
                Email: data.email.trim()
            }
            const response = await apiClient.post("/Staff", payload)
            if (response.status === 200 || response.status === 201) {
                alert("המורה נוסף בהצלחה!")
                setShowStaffForm(false)
                fetchStaff()
            }
        } catch {
            alert("שגיאה בשמירת המורה. בדקי את הנתונים.")
        }
    }

    const handleDeleteStaff = async (staffId: number) => {
        if (!confirm("האם למחוק מורה זו מהמערכת?")) return
        try {
            await apiClient.delete(`/Staff/${staffId}`)
            setAllStaff(prev => prev.filter(s => s.id !== staffId))
        } catch {
            alert("שגיאה במחיקת מורה")
        }
    }

    const handleUpdateStaff = (updated: Staff) => {
        setAllStaff(prev =>
            prev.map(s => s.id === updated.id ? { ...s, ...updated } : s)
        )
    }

    // --- UI Toggles ---

    const toggleGrade = (grade: string) =>
        setExpandedGrades(prev =>
            prev.includes(grade) ? prev.filter(g => g !== grade) : [...prev, grade]
        )

    const toggleClass = (classId: number) => {
        const isOpening = !expandedClasses.includes(classId)
        setExpandedClasses(prev =>
            prev.includes(classId) ? prev.filter(id => id !== classId) : [...prev, classId]
        )
        if (isOpening) fetchClassDetails(classId)
    }

    return {
        // State
        classes, allStaff, loading,
        expandedGrades, expandedClasses,
        showClassForm, showStudentForm, showStaffForm, showStaffList,
        selectedGrade, selectedClassId,
        editingStudent, editingClassId, editClassName,

        // Setters
        setShowClassForm, setShowStudentForm, setShowStaffForm, setShowStaffList,
        setSelectedGrade, setSelectedClassId,
        setEditingStudent, setEditingClassId, setEditClassName,

        // Handlers
        handleAddClass, handleDeleteClass, handleUpdateClass,
        handleAddStudent, handleUpdateStudent, handleDeleteStudent,
        handleAddTeacher, handleDeleteStaff, handleUpdateStaff,
        toggleGrade, toggleClass,
    }
}