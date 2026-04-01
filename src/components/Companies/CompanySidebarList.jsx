import { NavLink } from "react-router";
import { getCompanies } from "../../services/companyService.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";

const CompanySidebarList = () => {
  const { q, response, setFilter } = usePaginatedQuery(getCompanies, {
    page: 1,
    limit: 10,
    sort: "updatedAt",
    sortDir: "asc",
  });

  return (
    <>
      <ListSearch
        value={q}
        onChange={setFilter}
        placeholder="Search companies…"
      />
      <ul className="sidebar-list">
        <li>
          <NavLink to="/companies/new" className="sidebar-list__new">
            + New Company
          </NavLink>
        </li>
        {response.data.map((c) => (
          <li key={c._id}>
            <NavLink to={`/companies/${c._id}`}>{c.name}</NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/companies" className="sidebar-list__view-all">
            View all →
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default CompanySidebarList;
