import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1>"Its on the development Mode ... Coming Soon In Sha Allah" 🚀 </h1>
    </div>
  );
};

export default page;
