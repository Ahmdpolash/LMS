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
  type?: "text" | "email" | "password";
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
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            {as === "select" ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={cn("input space-y-1 mb-1", className)}
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
                className={cn("input space-y-1 mb-1", className)}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <Input
                type={type}
                className={cn("input space-y-1 mb-1", className)}
                placeholder={placeholder}
                {...field}
              />
            )}
          </FormControl>
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

export default FormField;
