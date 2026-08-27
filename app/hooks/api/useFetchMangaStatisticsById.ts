import { MangaStatisticsData } from '@/app/types/MangaStatisticsData';
import { useState, useEffect } from 'react';
import { API_Provider } from '../../utils/constants'

const useFetchMangaStatisticsById = (id: number) => {
    const [mangaStatistics, setMangaStatistics] = useState<MangaStatisticsData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMangaStatisticsById = async (id: number) => {
            try {
                setLoading(true);
                const res = await fetch(`${API_Provider}/manga/${id}/statistics`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setMangaStatistics(data.data);
                setLoading(false);
            } catch (error : any) {
                console.log(`[ERROR]: ${error.message}`);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMangaStatisticsById(id);
    }, [id]);

    return { mangaStatistics, loading, error };
};

export default useFetchMangaStatisticsById;