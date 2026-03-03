export const getData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const setData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};