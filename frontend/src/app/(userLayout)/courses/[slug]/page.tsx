import CourseDetails from "@/app/_components/pages/CourseDetails/CourseDetails";
import Container from "@/components/shared/Container";

const page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  return (
    <Container>
      <CourseDetails slug={slug} />
    </Container>
  );
};

export default page;
