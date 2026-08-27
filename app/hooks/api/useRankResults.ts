import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { API_Provider } from '../../utils/constants'

const useRankResults = <T>(limit: number = 10, mangaToggle: boolean = false) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialPage = parseInt(searchParams.get('page') || '1', 10);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [dataList, setDataList] = useState<T[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const endpoint = mangaToggle
            ? `${API_Provider}top/manga?page=${currentPage}&limit=${limit}`
            : `${API_Provider}/top/anime?page=${currentPage}&limit=${limit}`;
        
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                setDataList(data.data);
                setTotalPages(data.pagination.last_visible_page);
            });
    }, [currentPage, limit, mangaToggle]);

    // Reset currentPage to 1 when mangaToggle changes
    useEffect(() => {
        setCurrentPage(1);
    }, [mangaToggle]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`?page=${page}`, { scroll: false });
    };

    return {
        dataList,
        currentPage,
        totalPages,
        handlePageChange,
    };
};


export default useRankResults;