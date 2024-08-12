"use client";

import {useEffect} from "react";
import {useTheme} from "@/context/ThemeContext";
import {gql, useQuery, useApolloClient} from "@apollo/client";
import Image from "next/image";
import {useParams} from "next/navigation";
import {motion} from "framer-motion";


// Movie 인터페이스 정의: GraphQL 쿼리에서 반환될 영화 데이터의 구조를 정의합니다.
interface Movie {
    id: number;
    title: string;
    year: number;
    rating: number;
    runtime: number;
    genres: string[];
    summary: string;
    medium_cover_image: string;
    torrents: {
        url: string;
        quality: string;
        size: string;
    }[];
    isLiked: boolean; // 클라이언트 측에서 관리되는 좋아요 상태
}

// GraphQL 쿼리 정의: 특정 ID의 영화 상세 정보를 가져옵니다.
const GET_MOVIE_DETAILS = gql`
    query GetMovieDetails($id: Int!) {
        movie(id: $id) {
            id
            title
            year
            rating
            runtime
            genres
            summary
            medium_cover_image
            torrents {
                url
                quality
                size
            }
            isLiked @client # @client 지시어는 이 필드가 클라이언트에서 관리됨을 나타냅니다.
        }
    }
`;

export default function MoviePage() {
    // URL 파라미터에서 영화 ID를 추출합니다.
    const { id } = useParams();
    const movieId = Array.isArray(id) ? parseInt(id[0]) : parseInt(id as string);
    
    // 다크 모드 상태를 가져옵니다.
    const { darkMode } = useTheme();
    
    // Apollo Client 인스턴스에 접근합니다.
    const client = useApolloClient();

    // GraphQL 쿼리를 실행하여 영화 데이터를 가져옵니다.
    const { data, loading, error } = useQuery<{ movie: Movie }>(GET_MOVIE_DETAILS, {
        variables: { id: movieId },
    });

    // 컴포넌트가 마운트되거나 데이터가 변경될 때 isLiked 상태를 초기화합니다.
    useEffect(() => {
        if (data?.movie && data.movie.isLiked === undefined) {
            // isLiked가 설정되지 않은 경우 false로 초기화합니다.
            client.writeFragment({
                id: `Movie:${movieId}`,
                fragment: gql`
                    fragment MovieLike on Movie {
                        isLiked
                    }
                `,
                data: {
                    isLiked: false,
                },
            });
        }
    }, [data, movieId, client]);

    // 로딩 중이거나 에러 발생 시 적절한 메시지를 표시합니다.
    if (loading) return <p className="text-center p-4">Loading...</p>;
    if (error) return <p className="text-center p-4 text-red-500">Error: {error.message}</p>;

    const movie = data?.movie;

    // 영화 데이터가 없는 경우 메시지를 표시합니다.
    if (!movie || !movie.title) return <p className="text-center p-4">Movie Detail Info is not found</p>;

    // 좋아요 버튼 클릭 핸들러
    const handleLikeClick = () => {
        const newIsLiked = !movie.isLiked;
        // Apollo Client 캐시에 새로운 isLiked 상태를 씁니다.
        client.writeFragment({
            id: `Movie:${movieId}`,
            fragment: gql`
                fragment MovieLike on Movie {
                    isLiked
                }
            `,
            data: {
                isLiked: newIsLiked,
            },
        });
    };


    return (
        <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row items-center md:items-start mt-8">
                    <Image src={movie.medium_cover_image} alt={movie.title} width={256} height={384} className="rounded-lg shadow-lg" />
                    <div className="ml-0 md:ml-8 mt-4 md:mt-0">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-bold">{movie.title}</h1>
                            <motion.button
                                whileTap={{scale: 0.9}}
                                onClick={handleLikeClick}
                                className={`ml-4 p-2 rounded-full ${
                                    movie.isLiked
                                        ? "bg-red-500 text-white"
                                        : `${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`
                                }`}
                            >
                                <motion.svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={movie.isLiked ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                    initial={{scale: 1}}
                                    animate={{scale: movie.isLiked ? [1, 1.2, 1] : 1}}
                                    transition={{duration: 0.3}}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </motion.svg>
                            </motion.button>
                        </div>
                        <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                            {movie.year} | {movie.runtime} min | Rating: {movie.rating}
                        </p>
                        <p className="mt-4">{movie.summary}</p>
                        <div className="mt-4">
                            <strong>Genres:</strong>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {movie.genres.map((genre, index) => (
                                    <span key={index} className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4">
                            <strong>Torrents:</strong>
                            <ul className="list-disc list-inside mt-2">
                                {movie.torrents && movie.torrents.length > 0 ? (
                                    movie.torrents.map((torrent, index) => (
                                        <li key={index}>
                                            <a
                                                href={torrent.url}
                                                className={`hover:underline ${
                                                    darkMode ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-800"
                                                }`}
                                            >
                                                {torrent.quality} - {torrent.size}
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li>토렌트 정보가 없습니다.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
