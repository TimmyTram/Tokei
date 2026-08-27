import { useState, useEffect } from 'react';
import { MangaData } from '../../types/MangaData';
import { API_Provider } from '../../utils/constants'

/**
 * This will only run once per render
 * @param id mal_id of the anime
 * @returns 
 */
const useFetchMangaById = (id: number) => {
    const [manga, setManga] = useState<MangaData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMangaById = async (id: number) => {
            try {
                setLoading(true);
                const res = await fetch(`${API_Provider}/manga/${id}`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setManga(data.data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMangaById(id);
    }, [id]);

    return { manga, loading, error };
};

export default useFetchMangaById;