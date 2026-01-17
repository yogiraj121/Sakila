import { useQuery } from "@apollo/client/react";
import { GET_RECENT_TRANSACTIONS } from "../graphql/queries";
import { useFilters } from "../context/FilterContext";

export default function RecentTransactions() {
    const { filters } = useFilters();
    const { data, loading, error } = useQuery(GET_RECENT_TRANSACTIONS, { variables: filters });

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Recent Transactions</h2>
            <ul className="divide-y">
                {data.getRecentTransactions.map((t, i) => (
                    <li key={i} className="py-2">
                        <span className="font-semibold">{t.customerName}</span> rented{" "}
                        <span className="italic">{t.title}</span> for{" "}
                        <span className="font-bold text-green-600">${t.amount}</span>
                        <div className="text-gray-400 text-xs">
                            {new Date(t.paymentDate).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
