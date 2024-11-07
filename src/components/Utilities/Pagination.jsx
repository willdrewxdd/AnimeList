import { useState, useEffect } from "react";

const Pagination = ({ lastPage, setPage }) => {
    // State for current page
    const [page, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState(page);
    const [isClient, setIsClient] = useState(false); // Track if we are on the client-side

    // Ensure we are on the client-side
    useEffect(() => {
        setIsClient(true); // This will run only on the client
    }, []);

    // Load page from localStorage when the component mounts (client-side)
    useEffect(() => {
        if (isClient) {
            const savedPage = localStorage.getItem('currentPage');
            if (savedPage) {
                const initialPage = Number(savedPage);
                setCurrentPage(initialPage);
                setInputPage(initialPage);
                setPage(initialPage);
            }
        }
    }, [isClient, setPage]);

    // Save page to localStorage whenever it changes
    useEffect(() => {
        if (isClient) {
            localStorage.setItem('currentPage', page);
        }
    }, [page, isClient]);

    const scrollTop = () => {
        scrollTo({
            behavior: "smooth",
            top: 0,
        });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= lastPage) {
            setCurrentPage(newPage); // Update the internal state for the current page
            setPage(newPage); // Update the external state (for example, fetch data)
            scrollTop();
        }
    };

    const handleNextPage = () => handlePageChange(page + 1);
    const handlePrevPage = () => handlePageChange(page - 1);
    const handleFirstPage = () => handlePageChange(1);
    const handleLastPage = () => handlePageChange(lastPage);

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
            setInputPage(value);
        }
    };

    const handleJumpToPage = () => {
        const validPage = Math.max(1, Math.min(lastPage, Number(inputPage)));
        handlePageChange(validPage);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleJumpToPage();
        }
    };

    const renderButton = (label, onClick, condition) => (
        <button
            onClick={onClick}
            className={`transition-all hover:text-accent ${!condition ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!condition}
        >
            {label}
        </button>
    );

    return (
        <div className="flex justify-center items-center py-4 px-2 gap-4 text-primary text-2xl">
            {renderButton("First Page", handleFirstPage, page > 1)}

            {renderButton("Prev", handlePrevPage, page > 1)}

            <p>
                <input
                    type="text"
                    value={inputPage}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="w-16 text-center border rounded"
                />{" "}
                of {lastPage}
            </p>

            {renderButton("Next", handleNextPage, page < lastPage)}

            {page < lastPage && renderButton("Last Page", handleLastPage, page < lastPage)}
        </div>
    );
};

export default Pagination;
