import { useState, useEffect, useCallback, useRef } from "react";

const EMPTY_INITIAL = Object.freeze({});

function normalizeIncoming(raw) {
  if (raw == null) return {};
  const next = { ...raw };
  if (next.defaultLimit != null && next.limit == null) {
    next.limit = next.defaultLimit;
    delete next.defaultLimit;
  }
  return next;
}

function buildInitialParams(incoming) {
  const i = normalizeIncoming(incoming);
  return {
    q: "",
    sort: i.sort ?? "updatedAt",
    sortDir: i.sortDir ?? "desc",
    page: i.page ?? 1,
    limit: i.limit ?? 20,
    ...i,
  };
}

/**
 * @param {Function} fetchFn - (params) => Promise<{ data, total, totalPages }>
 * @param {object} [incoming] - Initial / parent-driven fields; refetches merged when JSON snapshot changes.
 */
const usePaginatedQuery = (fetchFn, incoming = EMPTY_INITIAL) => {
  const incomingRef = useRef(incoming);
  incomingRef.current = incoming;
  const incomingKey = JSON.stringify(incoming ?? {});

  const [params, setParamsState] = useState(() => buildInitialParams(incoming));

  const [response, setResponse] = useState({
    data: [],
    total: 0,
    totalPages: 1,
    loading: false,
    errors: [],
  });

  useEffect(() => {
    setParamsState((prev) => ({
      ...prev,
      ...normalizeIncoming(incomingRef.current),
    }));
  }, [incomingKey]);

  const setParams = useCallback((update) => {
    setParamsState((prev) => {
      const patch = typeof update === "function" ? update(prev) : update;
      return { ...prev, ...normalizeIncoming(patch) };
    });
  }, []);

  const setFilter = useCallback((q) => {
    setParamsState((prev) => ({ ...prev, q, page: 1 }));
  }, []);

  const setSortField = useCallback((field) => {
    setParamsState((prev) => ({ ...prev, sort: field, page: 1 }));
  }, []);

  const toggleSort = useCallback((field) => {
    setParamsState((prev) => {
      if (field === prev.sort) {
        return {
          ...prev,
          sortDir: prev.sortDir === "asc" ? "desc" : "asc",
          page: 1,
        };
      }
      return { ...prev, sort: field, sortDir: "asc", page: 1 };
    });
  }, []);

  const fetch = useCallback(async () => {
    setResponse((r) => ({ ...r, loading: true, errors: [] }));
    try {
      const res = await fetchFn({ ...params });
      setResponse({
        data: res.data,
        total: res.total,
        totalPages: res.totalPages,
        loading: false,
        errors: [],
      });
    } catch (e) {
      setResponse((r) => ({
        ...r,
        loading: false,
        errors: [e.message],
      }));
    }
  }, [fetchFn, params]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const refresh = useCallback(() => fetch(), [fetch]);

  return {
    params,
    setParams,
    response,
    setFilter,
    setSortField,
    toggleSort,
    refresh,
  };
};

export default usePaginatedQuery;
