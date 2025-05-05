"use client";

import { Input } from "@/components/ui/input";
import { PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  step: number;
  setStep: (step: number) => void;
  prerequisites: any[];
  setPrerequisites: (prerequisites: any[]) => void;
  benefits: any[];
  setBenefits: (benefits: any[]) => void;
};

const CoursePB = ({
  step,
  setStep,
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
}: Props) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handlePrerequisiteChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  // stepper btn

  const prevStep = () => setStep(step - 1);
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setStep(step + 1);
    } else {
      toast.error("Please fill all the fields first to Proceed next step!");
    }
  };

  return (
    <div className="space-y-8 bg-[#101828]  p-5 rounded-md">
      {/* Benefits */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">
          What are the Benefits for Students in this Course?
        </h2>

        {benefits.map((benefit, index) => (
          <Input
            key={index}
            name={`benefits.${index}.title`}
            placeholder="Write a benefit"
            required
            value={benefit.title}
            onChange={(e) => {
              handleBenefitChange(index, e.target.value);
            }}
            className="placeholder:text-slate-500 border-slate-600 "
          />
        ))}

        <button
          type="button"
          onClick={() => {
            setBenefits([...benefits, { title: "" }]);
          }}
          className="flex items-center text-blue-600 gap-1 cursor-pointer"
        >
          <PlusCircle size={20} />
          Add Benefit
        </button>
      </div>

      {/* Prerequisites */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">
          What are the Prerequisites for Students in this Course?
        </h2>

        {prerequisites.map((prerequisite, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              name={`prerequisites.${index}.title`}
              placeholder="Write a prerequisite"
              required
              value={prerequisite.title}
              onChange={(e) => {
                handlePrerequisiteChange(index, e.target.value);
              }}
              className="placeholder:text-slate-500 border-slate-600 "
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            setPrerequisites([...prerequisites, { title: "" }]);
          }}
          className="flex items-center text-blue-600 gap-1 cursor-pointer"
        >
          <PlusCircle size={20} />
          Add Prerequisite
        </button>
      </div>

      {/* stepper button */}

      <div className="w-full flex items-end justify-between py-8">
        <button
          disabled={step <= 1}
          type="button"
          onClick={prevStep}
          className={`
          py-2.5 px-6 rounded-md text-[1rem] text-white 
          ${
            step <= 1
              ? "cursor-not-allowed bg-blue-300"
              : "cursor-pointer bg-blue-500"
          }
        `}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleOptions}
          className="bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoursePB;
