"use client";

import {useTheme} from "@/context/ThemeContext";
import {gql, useQuery} from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    medium_cover_image: string;
}

const GET_MOVIES = gql`
    query GetMovies {
        movies {
            id
            title
            year
            rating
            medium_cover_image
        }
    }
`;

export default function MovieListPage() {
    const {darkMode} = useTheme();
    const {data, loading, error} = useQuery<{movies: Movie[]}>(GET_MOVIES);

    if (loading) return <p className="text-center p-4">Loading...</p>;

    if (error) {
        return (
            <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
                <div className="container mx-auto p-4">
                    <p className="text-center p-4 text-red-500">Error: {error.message}</p>
                </div>
            </div>
        );
    }

    const movies = data?.movies || [];

    return (
        <div className={`min-h-screen rounded-md ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Movie List</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie) => (
                        <Link href={`/movie/${movie.id}`} key={movie.id}>
                            <div
                                className={`rounded-lg overflow-hidden shadow-lg ${
                                    darkMode ? "bg-gray-800" : "bg-white"
                                } hover:shadow-xl transition-shadow duration-300`}
                            >
                                <Image src={movie.medium_cover_image} alt={movie.title} width={300} height={450} className="w-full object-cover" />
                                <div className="p-4">
                                    <h2 className="font-bold text-lg mb-2 truncate">{movie.title}</h2>
                                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                        {movie.year} | ⭐ {movie.rating}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
