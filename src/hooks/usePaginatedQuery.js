import { useState, useEffect, useCallback } from "react";

/**
 * @param {Function} fetchFn - Service function that accepts a params object
 *                             and returns { data, total, totalPages, page }
 * @param {object}  options
 * @param {string}  options.defaultSort    - Initial sort field (default: "updatedAt")
 * @param {string}  options.defaultSortDir - Initial sort direction (default: "desc")
 * @param {number}  options.defaultLimit   - Page size sent to the server (default: 20)
 */
const usePaginatedQuery = (fetchFn, options = {}) => {
  const {
    defaultSort = "updatedAt",
    defaultSortDir = "desc",
    defaultLimit = 10,
  } = options;

  const [query, setQueryState] = useState("");
  const [sortField, setSortField] = useState(defaultSort);
  const [sortDir, setSortDir] = useState(defaultSortDir);
  const [page, setPage] = useState(1);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const fetch = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    try {
      const res = await fetchFn({
        q: query,
        sort: sortField,
        sortDir,
        page,
        limit: defaultLimit,
      });
      setData(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      setErrors([e.message]);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, query, sortField, sortDir, page, defaultLimit]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const setQuery = (value) => {
    setQueryState(value);
    setPage(1);
  };

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const refresh = () => fetch();

  return {
    // data
    data,
    total,
    totalPages,
    loading,
    errors,
    // controls
    query,
    setQuery,
    sortField,
    sortDir,
    toggleSort,
    page,
    setPage,
    // manual refresh (e.g. after delete)
    refresh,
  };
};

export default usePaginatedQuery;