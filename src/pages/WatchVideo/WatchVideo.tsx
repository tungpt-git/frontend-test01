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
      console.log(res);
    };

    fetchVideo(id);
  }, [id]);

  return (
    <MenuLayout>
      <ReactPlayer
        controls
        pip={true}
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />
    </MenuLayout>
  );
}
