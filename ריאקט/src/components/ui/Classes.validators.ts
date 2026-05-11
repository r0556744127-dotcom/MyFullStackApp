export const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const isValidIsraeliId = (id: string): boolean =>
    /^\d{9}$/.test(id)

export const isValidFullName = (name: string): boolean =>
    name.trim().length >= 2

export const validateStudent = (data: {
    fullName: string
    identityNumber: string
    email: string
}): string | null => {
    if (!data.fullName?.trim() || !data.identityNumber?.trim())
        return "יש למלא שם מלא ומספר זהות"
    if (!isValidIsraeliId(data.identityNumber.trim()))
        return "מספר זהות חייב להכיל 9 ספרות"
    if (!isValidFullName(data.fullName))
        return "שם מלא קצר מדי"
    if (!data.email?.trim())
        return "יש להזין אימייל"
    if (!isValidEmail(data.email))
        return "אימייל לא תקין"
    return null
}

export const validateStaff = (data: {
    fullName: string
    identityNumber: string
    email: string
}): string | null => {
    if (!data.fullName?.trim() || !data.identityNumber?.trim())
        return "יש למלא שם מלא ומספר זהות"
    if (!isValidIsraeliId(data.identityNumber.trim()))
        return "מספר זהות חייב להכיל 9 ספרות"
    if (!isValidFullName(data.fullName))
        return "שם מלא קצר מדי"
    if (!data.email?.trim())
        return "יש להזין אימייל"
    if (!isValidEmail(data.email))
        return "אימייל לא תקין"
    return null
}