import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

const Success = ({ step, setStep }: any) => {
  const handleCreateAnotherCourse = () => {
    setStep(1);
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mb-4">
        <Check className="h-12 w-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold">Course Uploaded Successfully!</h3>
      <p className="text-gray-400 max-w-md">
        Your course has been successfully uploaded and is now pending review.
        You'll be notified once it's approved.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button
          variant="outline"
          className="border-[#2a3348] text-white hover:bg-[#2a3348] cursor-pointer"
          asChild
        >
          <Link href="/admin/courses">View All Courses</Link>
        </Button>
        <Button
          className="bg-blue-600 text-black dark:text-white hover:bg-blue-700 cursor-pointer"
          onClick={handleCreateAnotherCourse}
        >
          Create Another Course
        </Button>
      </div>
    </div>
  );
};
export default Success;
