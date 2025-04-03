import Image from "next/image";
import React from "react";

const PreLoader = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Image src={"/299.gif"} height={120} width={120} alt="loader" />
    </div>
  );
};

export default PreLoader;
