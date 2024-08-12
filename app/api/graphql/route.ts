import {ApolloServer} from "@apollo/server";
import {startServerAndCreateNextHandler} from "@as-integrations/next";
import fetch from "node-fetch";
import {NextResponse} from "next/server";
import {gql} from "@apollo/client";

const typeDefs = gql`
    type Torrent {
        url: String
        quality: String
        size: String
    }

    type Movie {
        id: Int
        title: String
        year: Int
        rating: Float
        runtime: Int
        genres: [String]
        summary: String
        language: String
        medium_cover_image: String
        torrents: [Torrent]
    }

    type Query {
        movies: [Movie]
        movie(id: Int!): Movie
    }
`;
const resolvers = {
    Query: {
        movies: async () => {
            try {
                const res = await fetch(`${process.env.YTS_API_BASE_URL}/list_movies.json`);

                const contentType = res.headers.get("content-type");

                if (contentType?.includes("application/json")) {
                    const data = await res.json();
                    return data.data.movies;
                } else {
                    throw new Error("Received non-JSON response");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                return [];
            }
        },
        movie: async (_: any, {id}: {id: number}) => {
            try {
                const res = await fetch(`${process.env.YTS_API_BASE_URL}/movie_details.json?movie_id=${id}`);

                if (res.ok && res.headers.get("content-type")?.includes("application/json")) {
                    const {data} = await res.json();
                    return data.movie;
                } else {
                    throw new Error("Received non-JSON response");
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
                return null;
            }
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

let apolloHandler: (req: Request) => Promise<Response>;

async function initApolloServer() {
    if (!apolloHandler) {
        apolloHandler = await startServerAndCreateNextHandler(server);
    }
    return apolloHandler;
}

export async function POST(request: Request) {
    const handler = await initApolloServer();
    const response = await handler(request);

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    return response;
}

export async function OPTIONS() {
    const headers = new Headers();
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type");

    return new NextResponse(null, {status: 204, headers});
}
