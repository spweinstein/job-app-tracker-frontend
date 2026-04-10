import { NavLink } from "react-router";
import { getResumes } from "../../services/resumeService.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";

const ResumeSidebarList = () => {
  const { params, response, setFilter } = usePaginatedQuery(getResumes, {
    page: 1,
    limit: 10,
    sort: "updatedAt",
    sortDir: "desc",
  });

  return (
    <>
      <ListSearch
        value={params.q}
        onChange={setFilter}
        placeholder="Search resumes…"
      />
      <ul className="sidebar-list">
        <li>
          <NavLink to="/resumes/new" className="sidebar-list__new">
            + New Resume
          </NavLink>
        </li>
        {response.data.map((r) => (
          <li key={r._id}>
            <NavLink to={`/resumes/${r._id}`}>
              {r?.name || "Untitled"}
              <span className="sidebar-list__version">
                {" "}
                (v{r.version || "0"})
              </span>
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/resumes" className="sidebar-list__view-all">
            View all →
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default ResumeSidebarList;
