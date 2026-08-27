'use client';

import ContentGrid from './ContentGrid';
import AnimeCard from '../anime/AnimeCard';
import Pagination from '../pagination/Pagination';
import useRankResults from '@/app/hooks/api/useRankResults';
import { useState } from 'react';
import ButtonToggle from '../ui/ButtonToggle';
import MangaCard from '../manga/MangaCard';
import { AnimeData } from '@/app/types/AnimeData';
import { MangaData } from '@/app/types/MangaData';

const RankResults = () => {
    const [showManga, setShowManga] = useState(false);
    const { dataList, currentPage, totalPages, handlePageChange } = useRankResults<MangaData | AnimeData>(10, showManga);

    return (
        <div className="w-screen min-h-screen flex flex-col bg-secondary">
            <div className="flex flex-col gap-8 items-center justify-center p-8">
                <ButtonToggle isManga={showManga} onToggle={() => setShowManga(prev => !prev)} />
                <h1 className="text-4xl font-bold italic underline underline-offset-8 decoration-4">
                    {showManga ? "Manga" : "Anime"} Rankings
                </h1>
            </div>
            <ContentGrid loading={false} error={null}>
                {dataList && dataList.map((item, index) => (
                    showManga ? (
                        <MangaCard key={`${index}-${currentPage}`} manga={item as MangaData} />
                    ) : (
                        <AnimeCard key={`${index}-${currentPage}`} anime={item as AnimeData} />
                    )
                ))}
            </ContentGrid>
            {dataList && dataList.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default RankResults;