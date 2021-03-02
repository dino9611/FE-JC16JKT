export const TambahAction = (angka) => {
  return {
    type: "TAMBAH",
    payload: angka,
  };
};

export const KurangAction = () => {
  return {
    type: "KURANG",
  };
};
