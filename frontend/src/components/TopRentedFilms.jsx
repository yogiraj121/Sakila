import { useQuery } from "@apollo/client/react";
import { GET_TOP_RENTED_FILMS } from "../graphql/queries";
import { useFilters } from "../context/FilterContext";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TopRentedFilms() {
    const { filters } = useFilters();
    const { data, loading, error } = useQuery(GET_TOP_RENTED_FILMS, { variables: filters });

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error.message}</p>;

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="font-semibold mb-2">Top 5 Rented Films</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.getTopRentedFilms}>
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rentalCount" fill="#3b82f6" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
