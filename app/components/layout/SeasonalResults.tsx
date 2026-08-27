'use client';

import ContentGrid from './ContentGrid';
import AnimeCard from '../anime/AnimeCard';
import Pagination from '../pagination/Pagination';
import useCurrentSeasonResults from '@/app/hooks/api/useCurrentSeasonResults';

const SeasonalResults = () => {
    const { animeList, currentPage, totalPages, handlePageChange } = useCurrentSeasonResults(10);

    return (
        <div className="w-screen min-h-screen flex flex-col bg-secondary">
            <h1 className="py-16 text-4xl flex items-center justify-center font-bold italic underline underline-offset-8 decoration-4">
                This Season&apos;s Anime List
            </h1>
            <ContentGrid loading={false} error={null}>
                {animeList && animeList.map((anime, index) => (
                    <AnimeCard key={index} anime={anime} />
                ))}
            </ContentGrid>
            {animeList && animeList.length > 0 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

export default SeasonalResults;
