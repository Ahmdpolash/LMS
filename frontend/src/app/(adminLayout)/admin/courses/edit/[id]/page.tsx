import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <div>
      <h1>Edit Course: {id}</h1>
      {/* Additional code for editing the course will go here */}
    </div>
  );
};

export default page;
