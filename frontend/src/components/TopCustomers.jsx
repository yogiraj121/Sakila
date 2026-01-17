import { useQuery } from "@apollo/client/react";
import { GET_TOP_CUSTOMERS } from "../graphql/queries";
import { useFilters } from "../context/FilterContext";
import { useState } from "react";

export default function TopCustomers() {
    const { filters } = useFilters();
    const { data, loading, error } = useQuery(GET_TOP_CUSTOMERS, { variables: filters });
    const [sortDesc, setSortDesc] = useState(true);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    const sorted = [...data.getTopCustomers].sort((a, b) =>
        sortDesc ? b.totalSpent - a.totalSpent : a.totalSpent - b.totalSpent
    );

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Top 10 Customers</h2>
            <table className="w-full text-sm border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Total Rentals</th>
                        <th
                            className="cursor-pointer"
                            onClick={() => setSortDesc((prev) => !prev)}
                        >
                            Total Spent {sortDesc ? "↓" : "↑"}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((c, i) => (
                        <tr key={i} className="border-b text-center">
                            <td>{i + 1}</td>
                            <td>{c.customer}</td>
                            <td>{c.totalRentals}</td>
                            <td>${c.totalSpent.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
