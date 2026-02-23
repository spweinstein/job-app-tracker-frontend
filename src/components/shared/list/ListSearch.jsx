export const ListSearch = ({ value, onChange, placeholder = "Search…", total }) => (    
  <div className="list-search">
    <div className="list-search-input-wrap">
      <span className="list-search-icon">⌕</span>
      <input
        className="list-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
    {total != null && (
      <span className="list-search-count">{total} result{total !== 1 ? "s" : ""}</span>
    )}
  </div>
);