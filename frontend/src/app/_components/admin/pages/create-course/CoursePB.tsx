"use client";

import FormField from "@/components/Auth/FormField";
import { PlusCircle, Trash2 } from "lucide-react";
import { useFormContext, useFieldArray } from "react-hook-form";

const CoursePB = () => {
  const { control } = useFormContext();

  // Benefits array
  const {
    fields: benefitFields,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({
    control,
    name: "benefits",
  });

  // Prerequisites array
  const {
    fields: prerequisiteFields,
    append: appendPrerequisite,
    remove: removePrerequisite,
  } = useFieldArray({
    control,
    name: "prerequisites",
  });

  return (
    <div className="space-y-8">
      {/* Benefits */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">
          What are the Benefits for Students in this Course?
        </h2>

        {benefitFields.map((field, index) => (
          <div key={field.id} className="w-full">
            <FormField
              control={control}
              name={`benefits.${index}.title`}
              label={`Benefit ${index + 1}`}
              placeholder="Write a benefit"
              className="placeholder:text-slate-500 w-full border-slate-600"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendBenefit({ title: "" })}
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

        {prerequisiteFields.map((field, index) => (
          <div key={field.id} className="">
            <FormField
              control={control}
              name={`prerequisites.${index}.title`}
              label={`Prerequisite ${index + 1}`}
              placeholder="Write a prerequisite"
              className="placeholder:text-slate-500 w-ful border-slate-600"
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() => appendPrerequisite({ title: "" })}
          className="flex items-center text-blue-600 gap-1 cursor-pointer"
        >
          <PlusCircle size={20} />
          Add Prerequisite
        </button>
      </div>
    </div>
  );
};

export default CoursePB;
