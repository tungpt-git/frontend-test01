import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore, IVideo } from "../utils/types";
import { getVideo } from "../api";
import Lyrics from "../components/Lyrics/Lyrics";
import { playVideo } from "../store/actions/nowPlaying";
import { useParams } from "react-router-dom";

const VideoDetails = () => {
  const dispatch = useDispatch();
  const nowPlaying = useSelector((store: IStore) => store.nowPlaying);
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = React.useState<IVideo>();

  React.useEffect(() => {
    const fetchVideo = async (id: string) => {
      const res = await getVideo({ id });
      setVideo(res);
    };

    fetchVideo(id);
  }, [id]);

  return (
    <>
      <Lyrics
        data={video?.segments || []}
        onSegmentClick={(s) => {
          dispatch(playVideo({ ...nowPlaying, startTime: s.start / 100 }));
        }}
      />
    </>
  );
};

export default VideoDetails;
