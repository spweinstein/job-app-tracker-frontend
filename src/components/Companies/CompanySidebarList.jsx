import { NavLink } from "react-router";
import { getCompanies } from "../../services/companyService.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";

const CompanySidebarList = () => {
  const { data, query, setQuery } = usePaginatedQuery(getCompanies, {
    defaultLimit: 10,
  });

  return (
    <>
      <ListSearch
        value={query}
        onChange={setQuery}
        placeholder="Search companies…"
      />
      <ul className="sidebar-list">
        <li>
          <NavLink to="/companies/new" className="sidebar-list__new">
            + New Company
          </NavLink>
        </li>
        {data.map((c) => (
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