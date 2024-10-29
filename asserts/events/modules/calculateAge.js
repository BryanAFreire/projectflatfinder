export function calculateAge(birthDateInput) {
    const currentDate = new Date();
    const birthDate = new Date(birthDateInput.value);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    const dayDifference = currentDate.getDate() - (birthDate.getDate()+1);

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }
    console.log('Age:', age);
    return age;
}