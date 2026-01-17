import { useQuery } from "@apollo/client/react";
import { GET_REVENUE_DISTRIBUTION } from "../graphql/queries";
import { useFilters } from "../context/FilterContext";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function RevenueDistribution() {
    const { filters } = useFilters();
    const { data, loading, error } = useQuery(GET_REVENUE_DISTRIBUTION, { variables: filters });

    const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Revenue Distribution by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data.getRevenueByCategory}
                        dataKey="revenue"
                        nameKey="category"
                        outerRadius={100}
                        label
                    >
                        {data.getRevenueByCategory.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
