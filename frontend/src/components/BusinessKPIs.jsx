import { useQuery } from "@apollo/client/react";
import { GET_KEY_METRICS } from "../graphql/queries";
import { useFilters } from "../context/FilterContext";

export default function BusinessKPIs() {
    const { filters } = useFilters();
    const { data, loading, error } = useQuery(GET_KEY_METRICS, { variables: filters });

    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error("GraphQL Error:", error);
        return (
            <div className="text-red-500">
                <p>Error: {error.message}</p>
                <pre className="text-xs mt-2 overflow-auto">{JSON.stringify(error, null, 2)}</pre>
            </div>
        );
    }

    const { totalRevenue, activeRentals } = data.getKeyMetrics;

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="text-gray-500">Total Revenue</h3>
                <p className="text-2xl font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow text-center">
                <h3 className="text-gray-500">Active Rentals</h3>
                <p className="text-2xl font-bold text-blue-600">{activeRentals}</p>
            </div>
        </div>
    );
}
