import { useState, useEffect } from 'react';
import { AnimeData } from '../../types/AnimeData';
import { API_Provider } from '../../utils/constants';

/**
 * This will only run once per render
 * @param id mal_id of the anime
 * @returns 
 */
const useFetchAnimeById = (id: number) => {
    const [anime, setAnime] = useState<AnimeData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeById = async (id: number) => {
            try {
                setLoading(true);
                const res = await fetch(`${API_Provider}/anime/${id}`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setAnime(data.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchAnimeById(id);
    }, [id]);

    return { anime, loading, error };
}

export default useFetchAnimeById;