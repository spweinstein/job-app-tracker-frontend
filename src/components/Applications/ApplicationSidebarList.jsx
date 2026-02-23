import { NavLink } from "react-router";
import { getApplications } from "../../services/applicationService.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";

const ApplicationSidebarList = () => {
  const { data, query, setQuery } = usePaginatedQuery(getApplications, {
    defaultLimit: 10,
  });

  return (
    <>
      <ListSearch
        value={query}
        onChange={setQuery}
        placeholder="Search applications…"
      />
      <ul className="sidebar-list">
        <li>
          <NavLink to="/applications/new" className="sidebar-list__new">
            + New Application
          </NavLink>
        </li>
        {data.map((a) => (
          <li key={a._id}>
            <NavLink to={`/applications/${a._id}`}>
              {a.title || "Untitled"}
              {a.company?.name ? ` @ ${a.company.name}` : ""}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/applications" className="sidebar-list__view-all">
            View all →
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default ApplicationSidebarList;
