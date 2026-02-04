const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/companies`;

const getCompanies = async (req, res) => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};
console.log(await getCompanies());
export { getCompanies };
