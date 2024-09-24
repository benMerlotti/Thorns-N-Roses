export const getAllNurseries = () => {
  return fetch("http://localhost:8088/nurseries").then((res) => res.json());
};

export const getNurseryFlowers = () => {
  return fetch("http://localhost:8088/nurseryFlowers?_expand=flower").then(
    (res) => res.json()
  );
};
