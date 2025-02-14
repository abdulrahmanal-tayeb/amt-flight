import { useCallback, useMemo, useState } from "react";
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


/**
 * Paginates any list of items. Use the `render` method to "Plug In" your component.
 */
export function Paginated({
    itemsPerPage,
    items,
    render = () => { }
}) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = useCallback((page) => {
        const newOffset = (page * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    }, [items, itemsPerPage]);

    const renderedItems = useMemo(() => (
        currentItems? currentItems.map(render) : null
    ), [currentItems, render]);

    return (
        <>
            {renderedItems}
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

