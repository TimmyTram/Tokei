'use client';

import { AnimeStreamingData } from '@/app/types/AnimeStreamingData';
import { useState } from 'react';
import { API_Provider } from '../../utils/constants'

const useFetchAnimeStreaming = () => {
    const [animeStreamingLinks, setAnimeStreamingLinks] = useState<AnimeStreamingData[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAnimeStreamingLinks = async (animeId: number) => {
        const res = await fetch(`${API_Provider}/anime/${animeId}/streaming`);
        const data = await res.json();
        setLoading(false);
        setAnimeStreamingLinks(data.data);
    };

    return { animeStreamingLinks, fetchAnimeStreamingLinks, loading };
};

export default useFetchAnimeStreaming;