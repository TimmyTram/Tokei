import { useState, useEffect } from 'react';
import { AnimeStatisticsData } from '../../types/AnimeStatisticsData';
import { API_Provider } from '../../utils/constants'

const useFetchAnimeStatisticsById = (id: number) => {
    const [animeStatistics, setAnimeStatistics] = useState<AnimeStatisticsData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimeStatisticsById = async (id: number) => {
            try {
                setLoading(true);
                const res = await fetch(`${API_Provider}/anime/${id}/statistics`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setAnimeStatistics(data.data);
                setLoading(false);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnimeStatisticsById(id);
    }, [id]);
    
    return { animeStatistics, loading, error };
};

export default useFetchAnimeStatisticsById;