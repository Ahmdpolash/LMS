const StepperButton = ({ step, prevStep, nextStep }:any) => {
  return (
    <div className="w-full flex items-end justify-between py-8">
      <button
        disabled={step <= 1}
        type="button"
        onClick={prevStep}
        className={`${
          step <= 1 && "cursor-not-allowed hidden"
        } text-[1rem]  bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer`}
      >
        Previous
      </button>
      <button
        // type="submit"
        onClick={nextStep}
        disabled={step > 4}
        className={`${
          step > 4 && "!bg-blue-300 cursor-not-allowed"
        } bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer`}
      >
        {step > 3 ? "Submit" : "Next"}
      </button>
    </div>
  );
};
export default StepperButton;
