import React, { useState, useEffect } from 'react';
import './YoutubeChannelList.css';

const YouTubeChannelList = ({ apiKey, channelIds }) => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const channelsPerPage = 25;

    // Cache to store fetched channel data
    const channelCache = new Map();

    const fetchChannels = async (batchIds) => {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${batchIds}&key=${apiKey}`
            );
            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error.code === 403 && errorData.error.message.includes('quota exceeded')) {
                    // Quota exceeded error, retry after a short delay
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return fetchChannels(batchIds);
                } else {
                    throw new Error(`Failed to fetch channels. Error: ${JSON.stringify(errorData)}`);
                }
            }
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error(`Error fetching channels for batch:`, error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchAllChannels = async () => {
            try {
                const batchSize = 50; // Maximum number of IDs per request
                const fetchedChannels = [];

                for (let i = 0; i < channelIds.length; i += batchSize) {
                    const batchIds = channelIds.slice(i, i + batchSize).join(',');

                    // Check cache before making API call
                    if (channelCache.has(batchIds)) {
                        fetchedChannels.push(...channelCache.get(batchIds));
                    } else {
                        try {
                            const channels = await fetchChannels(batchIds);
                            fetchedChannels.push(...channels);
                            // Store in cache
                            channelCache.set(batchIds, channels);
                        } catch (error) {
                            console.error(`Error fetching channels for batch starting at index ${i}:`, error);
                        }
                    }
                }

                setChannels(fetchedChannels);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllChannels();
    }, [apiKey, channelIds]);

    const indexOfLastChannel = currentPage * channelsPerPage;
    const indexOfFirstChannel = indexOfLastChannel - channelsPerPage;

    const sortedChannels = [...channels].sort((a, b) => {
        const countA = parseInt(a.statistics.subscriberCount, 10) || 0;
        const countB = parseInt(b.statistics.subscriberCount, 10) || 0;
        return sortOrder === 'asc' ? countA - countB : countB - countA;
    });

    const currentChannels = sortedChannels.slice(indexOfFirstChannel, indexOfLastChannel);

    const totalPages = Math.ceil(channels.length / channelsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <button className="sort-button" onClick={toggleSortOrder}>
                Sort by Subscribers: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
            <div className="channel-grid">
                {currentChannels.map((channel) => (
                    <div key={channel.id} className="channel-item">
                        <a href={`https://www.youtube.com/channel/${channel.id}`} target="_blank" rel="noopener noreferrer">
                            <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
                        </a>
                        <div className="channel-info">
                            <h3>{channel.snippet.title}</h3>
                            <p>{channel.statistics.subscriberCount} subscribers</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default YouTubeChannelList;