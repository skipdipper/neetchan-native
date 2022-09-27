import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import Video, { OnPlaybackRateData } from 'react-native-video';


type GalleryVideoProps = {
    uri: string,
    poster?: string,
    postId: number,
};

function GalleryVideo({ uri, poster, postId }: GalleryVideoProps, ref: React.Ref<any>) {
    const videoRef = useRef<Video>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Ref to imperatively update Video props
    const videoSettings = useRef({ paused: true, playbackRate: 0, uri: '' });

    useEffect(() => {
        // console.log('MOUNTED VIDEO:', uri);
        setVideoUri();

        return () => {
            // console.log('UNMOUNTED VIDEO:', uri);
            unload();
        }
    }, []);

    // TODO: Add custom video controls

    const setVideoUri = () => {
        videoSettings.current.uri = uri;
    }

    // https://github.com/react-native-video/react-native-video/issues/2478
    const handlePlaybackRateChange = ({ playbackRate }: OnPlaybackRateData) => {
        // console.log('Playback rate changed:', playbackRate);

        videoSettings.current.playbackRate = playbackRate;
        if (playbackRate === 0) {
            console.log('Video is paused!');
        } else {
            console.log('Video is playing!');
        }
    }

    const play = () => {
        // Video not mounted
        if (videoRef.current === null) return;
        // Video is already playing
        // if (videoSettings.current.playbackRate > 0) return;
        if (!videoSettings.current.paused) return;
        // Resume Video playback
        videoSettings.current.paused = false;
        // console.log('SET PAUSE TO FALSE PLAYING');
    }

    const stop = () => {
        // Video not mounted
        if (videoRef.current === null) return;
        // Video is already paused
        // if (videoSettings.current.playbackRate === 0) return;
        if (videoSettings.current.paused) return;
        // Resume Video playback
        videoSettings.current.paused = true;
        // console.log('SET PAUSE TO TRUE PAUSING');
    }

    const unload = () => {
        // Video not mounted
        if (videoRef.current === null) return;

        // Stop playback, and clear out the previous source content
        // by setting source to null
        videoSettings.current.uri = '';
        // console.log('SET VIDEO SOURCE TO NULL');
    }

    // Public methods exposed by Ref
    useImperativeHandle(ref, () => {
        return {
            play,
            stop,
            unload,
            postId // only used as key to identify in parent callback ref 
        }
    }, []);

    // Handle when the media is loaded and ready to play
    const handleLoad = () => {
        setIsLoading(false);
        // Ensure video is playing if not already playing due to
        // video still buffering when imperatively invoked to play
        play();
    }

    return (
        <>
            <Video
                style={styles.video}
                ref={videoRef}
                source={{ uri: videoSettings.current.uri }}
                paused={videoSettings.current.paused}
                rate={1}
                onPlaybackRateChange={handlePlaybackRateChange}
                controls={true}
                repeat={true}
                resizeMode='contain'
                poster={poster}
                posterResizeMode='contain'
                onLoad={handleLoad}
                onError={(error) => console.log(error)}
                disableFocus={false}
            />
            <ActivityIndicator style={{ position: 'absolute' }}
                animating={isLoading}
            />
        </>
    );
}
export default React.forwardRef(GalleryVideo);


const styles = StyleSheet.create({
    video: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    }
});


