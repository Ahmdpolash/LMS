"use client";

import Container from "@/components/shared/Container";
import { useParams } from "next/navigation";

const page = () => {
  const { slug } = useParams();

  return (
    <Container>
      <h1>{slug}</h1>
    </Container>
  );
};

export default page;
