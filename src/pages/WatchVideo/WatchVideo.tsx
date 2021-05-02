import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { getVideo } from "../../api";
import MenuLayout from "../../layouts/MenuLayout";
import { IVideo } from "../../utils/types";

type Props = any;
export default function WatchVideo(props: Props) {
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
    <MenuLayout>
      {!video ? (
        <CircularProgress />
      ) : (
        <ReactPlayer controls pip={true} url={video.url} />
      )}
    </MenuLayout>
  );
}
