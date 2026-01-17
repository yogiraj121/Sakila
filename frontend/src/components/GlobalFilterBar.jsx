import { useFilters } from "../context/FilterContext";

export default function GlobalFilterBar() {
  const { filters, updateFilter } = useFilters();

  return (
    <div className="flex gap-4 bg-white p-3 shadow rounded-lg mb-4">
      <select
        onChange={(e) =>
          updateFilter("storeId", e.target.value === "all" ? null : Number(e.target.value))
        }
      >
        <option value="all">All Stores</option>
        <option value="1">Store 1</option>
        <option value="2">Store 2</option>
      </select>

      <input
        type="date"
        value={filters.startDate}
        onChange={(e) => updateFilter("startDate", e.target.value)}
      />

      <input
        type="date"
        value={filters.endDate}
        onChange={(e) => updateFilter("endDate", e.target.value)}
      />
    </div>
  );
}
