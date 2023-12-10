export const formatDate = (date: Date) => {
    const dateObject = new Date(date);
    let day = dateObject.getDate() + 1;
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    return day + "-" + month + "-" + year;
}