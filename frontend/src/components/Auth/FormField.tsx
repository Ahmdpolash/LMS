// import { Controller, Control, FieldValues, Path } from "react-hook-form";

// import {
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// interface FormFieldProps<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   placeholder?: string;
//   type?: "text" | "email" | "password";
// }

// const FormField = <T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   type = "text",
// }: FormFieldProps<T>) => {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field, fieldState }) => (
//         <FormItem>
//           <FormLabel className="label">{label}</FormLabel>
//           <FormControl>
//             <Input
//               className="input space-y-1 mb-1"
//               type={type}
//               placeholder={placeholder}
//               {...field}
//             />
//           </FormControl>
//           {fieldState.error && (
//             <FormMessage>{fieldState.error.message}</FormMessage>
//           )}
//         </FormItem>
//       )}
//     />
//   );
// };

// export default FormField;

import { Controller, Control, FieldValues, Path } from "react-hook-form";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; // ✅ import this
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
  as?: "input" | "textarea" | "select"; // ✅ Add select
  className?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
}

const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  className,
  options,
  required,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-1.5">
          <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {label}
          </FormLabel>
          <FormControl>
            {as === "select" ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn(
                    "input w-full rounded-full min-h-12 px-5 bg-gray-50 dark:bg-[#131b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:bg-white dark:focus:bg-[#131b2e] focus:border-[rgb(37,150,190)]",
                    className
                  )}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : as === "textarea" ? (
              <Textarea
                className={cn(
                  "input w-full rounded-2xl min-h-24 p-4 bg-gray-50 dark:bg-[#131b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#131b2e] focus:border-[rgb(37,150,190)]",
                  className
                )}
                placeholder={placeholder}
                {...field}
              />
            ) : type === "file" ? (
              <Input
                type="file"
                className={cn(
                  "input w-full rounded-full min-h-12 px-5 bg-gray-50 dark:bg-[#131b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white",
                  className
                )}
                onChange={(e) => {
                  field.onChange(e.target.files?.[0]);
                }}
              />
            ) : (
              <Input
                type={type}
                className={cn(
                  "input w-full rounded-full min-h-12 px-5 bg-gray-50 dark:bg-[#131b2e] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-[#131b2e] focus:border-[rgb(37,150,190)] shadow-none",
                  className
                )}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          {fieldState.error && (
            <FormMessage className="text-xs text-red-500 mt-1 font-medium">{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormField;
