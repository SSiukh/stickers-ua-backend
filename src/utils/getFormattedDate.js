export const getFormattedDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); // місяці від 0 до 11
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
};
