export const getAllFlowers = () => {
  return fetch("http://localhost:8088/nurseryFlowers?_expand=flower").then(
    (res) => res.json()
  );
};
