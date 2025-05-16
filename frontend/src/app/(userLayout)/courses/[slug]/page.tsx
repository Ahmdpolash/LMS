import CourseDetails from "@/app/_components/pages/CourseDetails/CourseDetails";
import Container from "@/components/shared/Container";

const CourseDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;

  return (
    <Container>
      <CourseDetails slug={slug} />
    </Container>
  );
};

export default CourseDetailsPage;
