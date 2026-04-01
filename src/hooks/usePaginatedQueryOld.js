import { useState, useEffect, useCallback } from "react";

/**
 * @param {Function} fetchFn - Service function that accepts a params object
 *                             and returns { data, total, totalPages, page }
 * @param {object}  params - Initial parameters
 */

const usePaginatedQuery = (fetchFn, params = {}) => {
  const [query, setQueryState] = useState("");
  const [sortField, setSortField] = useState(params.sort || "updatedAt");
  const [sortDir, setSortDir] = useState(params.sortDir || "desc");
  const [page, setPage] = useState(params.page || 1);
  const [limit, setLimit] = useState(params.limit || 20);

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
        limit,
        ...params,
      });
      setData(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (e) {
      setErrors([e.message]);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, query, sortField, sortDir, page, limit]);

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
    limit,
    setLimit,
    // manual refresh (e.g. after delete)
    refresh,
  };
};

export default usePaginatedQuery;
