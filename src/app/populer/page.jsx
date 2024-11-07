"use client"

import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import { useEffect, useState } from "react";
import { getAnimeResponse } from "../../libs/api-libs";

const Page = () => {
    const [page, setPage] = useState(1); // Inisialisasi dengan nilai default 1
    const [topAnime, setTopAnime] = useState([]);
    const [isClient, setIsClient] = useState(false); // State to track client-side rendering

    // Load page from localStorage after component mounts (on client-side)
    useEffect(() => {
        setIsClient(true); // Set to true when client-side rendering occurs

        const savedPage = localStorage.getItem('currentPage');
        if (savedPage) {
            setPage(Number(savedPage)); // Update page state from localStorage if available
        }
    }, []);

    const fetchData = async() => {
        const populerAnime = await getAnimeResponse("top/anime", `page=${page}`);
        setTopAnime(populerAnime);
    };

    // Fetch data when page changes or on initial load
    useEffect(() => {
        if (isClient) {
            fetchData();
        }
    }, [page, isClient]);

    return (
        <>
            <HeaderMenu title={`ANIME TERPOPULER #${page}`} />
            <AnimeList api={topAnime} />
            <Pagination page={page} lastPage={topAnime.pagination?.last_visible_page} setPage={setPage} />
        </>
    );
};

export default Page;
