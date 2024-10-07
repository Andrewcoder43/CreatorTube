import React, { useState, useEffect } from 'react';
import './RandomVideoGenerator.css'; // Import the CSS file

const RandomVideoGenerator = ({ apiKey, channelIds }) => {
    const [videoList, setVideoList] = useState([]);
    const [currentVideo, setCurrentVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const responses = await Promise.all(
                    channelIds.map(channelId =>
                        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&type=video&maxResults=5`)
                    )
                );
                const data = await Promise.all(responses.map(response => response.json()));
                const videos = data.flatMap(d => (d.items ? d.items : []));

                // Filter videos where the title starts with "I" followed by a past tense verb
                const filteredVideos = videos.filter(video => {
                    const title = video.snippet.title;
                    return /^I\s+\b\w+ed\b/.test(title);
                });

                const videoUrls = filteredVideos.map(item => `https://www.youtube.com/embed/${item.id.videoId}`);
                setVideoList(videoUrls);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, [apiKey, channelIds]);

    const selectRandomVideo = () => {
        if (videoList.length > 0) {
            const randomIndex = Math.floor(Math.random() * videoList.length);
            setCurrentVideo(videoList[randomIndex]);
            console.log('Selected video URL:', videoList[randomIndex]); // Log selected video URL
        } else {
            console.log('No videos available to select.');
        }
    };

    return (
        <div className="container">
            <h2>Random YouTube Video Generator</h2>
            <button className="youtube-button" onClick={selectRandomVideo}>
                Generate Random Video
            </button>
            {currentVideo ? (
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src={currentVideo}
                        title="Random Video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            ) : (
                <p>No video selected. Click the button to generate a random video.</p>
            )}
        </div>
    );
};

export default RandomVideoGenerator;