import React, { useState } from "react";
import Masonry from 'react-masonry-css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from "./Card";

export const Cards = ({ data, imageUrls }) => {
    // для подгрузки новых карточек при скролле
    const [page, setPage] = useState(1);
    const breakpointColumnsObj = {
        default: 3,
        1365: 2,
        768: 1
    };
    
    const fetchMoreData = () => {
        setPage(page + 1);
    };

    const displayedData = data.slice(0, page * 20);
    return (
        <>
            <InfiniteScroll
                dataLength={displayedData.length}
                next={fetchMoreData}
                hasMore={displayedData.length < data.length}
            >
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {displayedData.map((card) => {
                        const imageUrl = imageUrls.find((url) => url.includes(`/trello/${card.id}.jpg`));
                        return(
                            <Card
                                key={card.id}
                                card={card}
                                imageUrl={imageUrl}
                            />
                        )
                    })}
                </Masonry>
            </InfiniteScroll>
        </>
    )
}

export default Cards;