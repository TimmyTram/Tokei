'use client';

import ContentGrid from './ContentGrid';
import AnimeCard from '../anime/AnimeCard';
import Pagination from '../pagination/Pagination';
import Searchbar from '../ui/Searchbar';
import { useState } from 'react';
import ButtonToggle from '../ui/ButtonToggle';
import useJikanSearch from '@/app/hooks/api/useJikanSearch';
import { MangaData } from '@/app/types/MangaData';
import { AnimeData } from '@/app/types/AnimeData';
import MangaCard from '../manga/MangaCard';

const SearchResults = () => {
    const [showManga, setShowManga] = useState(false);
    const { dataList, searchTerm, setSearchTerm, currentPage, setCurrentPage, totalPages } = useJikanSearch<AnimeData | MangaData>(10, showManga);

    return (
            <div className="w-screen min-h-screen flex flex-col bg-secondary">
                <div className="flex justify-center p-4">
                <ButtonToggle isManga={showManga} onToggle={() => setShowManga(prev => !prev)} />
                </div>
                <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <ContentGrid loading={false} error={null}>
                    {dataList && dataList.map((data, index) => (
                        showManga ? (
                            <MangaCard key={index} manga={data as MangaData} />
                        ) : (
                            <AnimeCard key={index} anime={data as AnimeData} />
                        )
                    ))}
                </ContentGrid>
                {dataList && dataList.length > 0 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
            </div>
        );
};

export default SearchResults;