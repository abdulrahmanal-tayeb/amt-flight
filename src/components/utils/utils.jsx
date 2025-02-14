import { useCallback, useMemo, useState } from "react";
import { Pagination } from "@mui/material";
import Select from "../ui/Select";
import SwapVertIcon from '@mui/icons-material/SwapVert';

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
 * Paginates any list of items. Use the `render` method to "Plug In" the component.
 */
export function Paginated({
    itemsPerPage,
    items: passedItems,
    render = () => { },
    sortOptions
}) {
    // Results returned from the API might be too big and they don't have
    // any pagination or limits parameter, so limiting it to 50
    // would be better
    const [items, setItems] = useState(passedItems.slice(0, 50) ?? []);
    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items ? items.slice(itemOffset, endOffset) : [];

    const pageCount = Math.ceil((items.length) / itemsPerPage);

    const handlePageClick = useCallback((page) => {
        const newOffset = (page * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    }, [items, itemsPerPage]);

    const renderedItems = useMemo(() => (
        currentItems ? currentItems.map(render) : null
    ), [currentItems, render]);

    const handleSort = useCallback(
        ({ target: { value } }) => {
            // Here I am making a copy of the original list to prevent
            // accedental mutation
            const sortedItems = [...items].sort((a, b) => {
                const comparison = a.price.raw - b.price.raw;
                // If the value starts with '.' then we are sorting descenedently
                return value.startsWith('.') ? -comparison : comparison;
            });
            setItems(sortedItems);
        },
        [items]
    );

    return (
        <>
            <Select
                label="Sort"
                options={sortOptions}
                onChange={handleSort}
                icon={<SwapVertIcon />}
            />
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

