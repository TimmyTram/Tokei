'use client';

import useFetchAnimeStreaming from "@/app/hooks/api/useFetchAnimeStreaming";
import { useState } from "react";

interface AnimeStreamingProps {
    animeId: number;
}

const AnimeStreaming = ({ animeId }: AnimeStreamingProps) => {
    const { animeStreamingLinks, fetchAnimeStreamingLinks } = useFetchAnimeStreaming();
    const [hasFetched, setHasFetched] = useState(false);

    const getStreamingLinks = async () => {
        if (!hasFetched) { // prevent spamming the API
            await fetchAnimeStreamingLinks(animeId);
            setHasFetched(true);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[1600px] bg-secondarydark p-4 sm:p-8 rounded-lg shadow-lg">
            {!hasFetched && (
                <button
                    className="bg-secondary p-4 rounded-lg shadow-lg font-semibold hover:text-primary transition-colors duration-300"
                    onClick={getStreamingLinks}
                    disabled={hasFetched}
                >
                    Get Streaming Links
                </button>
            )}
            {hasFetched && (
                <div className="flex flex-col md:flex-row gap-4">
                    {animeStreamingLinks && animeStreamingLinks.map((link) => (
                        <div key={link.name} 
                        className="bg-secondary p-4 rounded-lg shadow-lg font-semibold hover:text-primary transition-colors duration-300"
                        >
                            <a href={link.url} target="_blank" rel="noreferrer">
                                {link.name}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnimeStreaming;