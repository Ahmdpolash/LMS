// const StepperButton = ({ step, prevStep, nextStep }: any) => {
//   return (
//     <div className="w-full flex items-end justify-between py-8">
//       <button
//         disabled={step <= 1}
//         type="button"
//         onClick={prevStep}
//         className={`
//     py-2.5 px-6 rounded-md text-[1rem] text-white
//     ${
//       step <= 1
//         ? "cursor-not-allowed bg-blue-300"
//         : "cursor-pointer bg-blue-500"
//     }
//   `}
//       >
//         Previous
//       </button>

//       <button
//         type="submit"
//         onClick={nextStep}
//         disabled={step > 4}
//         className={`${
//           step > 4 && "!bg-blue-300 cursor-not-allowed"
//         } bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer`}
//       >
//         {step > 3 ? "Submit" : "Next"}
//       </button>
//     </div>
//   );
// };
// export default StepperButton;

const StepperButton = ({ step, prevStep, nextStep, isSubmitting }: any) => {
  return (
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

      {step === 4 ? (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 py-2.5 px-6 rounded-md text-white ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      ) : (
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-500 py-2.5 px-6 rounded-md text-white cursor-pointer"
        >
          Next
        </button>
      )}
    </div>
  );
};
export default StepperButton;
