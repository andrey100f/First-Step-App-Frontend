/**
 * Funcție care formatează o dată într-un șir de caractere în formatul "zi-lună-an".
 * @param date - Obiectul de tip Date care reprezintă data de formatat.
 * @returns - Șirul de caractere formatat în stilul "zi-lună-an".
 */
export const formatDate = (date: Date) => {
  const dateObject = new Date(date);
  let day = dateObject.getDate() + 1;
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();
  return day + "-" + month + "-" + year;
};
