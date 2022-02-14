import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readNews } from '../reducers/newsFeedSlice';
import NewsCard from './NewsCard';
import LoadMoreButton from './LoadMoreButton';

function NewsFeed() {
  const dispatch = useDispatch();
  const { items, moreAvailable, loading } = useSelector((state) => state.newsFeed);

  const handleClick = () => {
    dispatch(readNews());
  };

  useEffect(() => {
    dispatch(readNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="feed">
      {items && items.map((item) =>
        <NewsCard key={item.id} item={item} />
      )}
      {moreAvailable && <LoadMoreButton isLoading={loading} onClick={handleClick} />}
    </div>
  );
}

export default NewsFeed;
