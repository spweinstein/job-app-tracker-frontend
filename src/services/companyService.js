const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/companies`;

const getCompanies = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const getCompany = async (companyId) => {
  try {
    const res = await fetch(BASE_URL + "/" + companyId);
    const ret = res.json();
    // console.log(ret);
    return ret; //res.json();
  } catch (e) {
    console.log(e);
  }
};

// console.log(await getCompanies());
// getCompany("6983a57a005db84266a160db");
export { getCompanies, getCompany };
