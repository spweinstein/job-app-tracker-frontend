import { NavLink } from "react-router";
import { getCoverLetters } from "../../services/coverLetterService.js";
import usePaginatedQuery from "../../hooks/usePaginatedQuery.js";
import { ListSearch } from "../shared/list/ListSearch.jsx";

const CoverLetterSidebarList = () => {
  const { q, response, setFilter } = usePaginatedQuery(getCoverLetters, {
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
        placeholder="Search cover letters…"
      />
      <ul className="sidebar-list">
        <li>
          <NavLink to="/cover-letters/new" className="sidebar-list__new">
            + New Cover Letter
          </NavLink>
        </li>
        {response.data.map((cl) => (
          <li key={cl._id}>
            <NavLink to={`/cover-letters/${cl._id}`}>
              {cl.name || "Untitled"}
            </NavLink>
          </li>
        ))}
        <li>
          <NavLink to="/cover-letters" className="sidebar-list__view-all">
            View all →
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default CoverLetterSidebarList;
