import { useState } from "react";
import { Pagination } from "@mui/material";

export function Layout({ children, style = {} }) {
    return (
        <div
            style={style}
            className="amt-flex amt-flex-center amt-base-container"
        >
            <div
                className="amt-container amt-flex amt-flex-center"
            >
                {children}
            </div>
        </div>
    );
}


export function Paginated({
    itemsPerPage,
    items,
    render = () => { }
}) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (page) => {
        const newOffset = (page * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {currentItems.map(render)}
            <div className="amt-flex amt-flex-center mb-5">
                <Pagination
                    count={Math.min(pageCount, 3)} // limit to 3 pages
                    variant="outlined"
                    onChange={(_, pageNumber) => handlePageClick(pageNumber)}
                    siblingCount={2}  // Show 2 pages on each side of the current page
                    boundaryCount={2}
                />
            </div>
        </>
    )
}

