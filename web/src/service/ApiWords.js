export const getWords = () => {
  return fetch("http://localhost:4000/hangmanwords", {
    method: "GET",
    headers: { "content-Type": "application/json" },
  }).then((response) => response.json());
};
