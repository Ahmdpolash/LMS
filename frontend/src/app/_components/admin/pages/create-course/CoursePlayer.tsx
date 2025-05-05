"use client";

import { useEffect, useState } from "react";
import axios from "axios";
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer = ({ videoUrl }: Props) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/v1/course/get-videoCipher-otp`, {
        videoId: videoUrl,
      })
      .then((res: any) => {
        setVideoData(res.data);
      })
      .catch((error: any) => {
        console.error("Error fetching video data:", error);
      });
  }, [videoUrl]);

  return (
    <div>
      {videoData.otp && videoData.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=8E3xgDx2v88RnxNa`}
          style={{
            border: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow="encrypted-media"
        ></iframe>
      )}
      
    </div>
  );
};
export default CoursePlayer;
