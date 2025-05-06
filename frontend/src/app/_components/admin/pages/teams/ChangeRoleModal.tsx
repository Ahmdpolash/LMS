import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useChangeUserRoleMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";

export function ChangeRoleModal({ users }: any) {
//   const filterUser = users?.data?.filter((user: any) => user?.role === "user");

  const [changeRole] = useChangeUserRoleMutation();
  const [open, setOpen] = useState(false);

  const [data, setData] = useState({
    email: "",
    role: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, role } = data;
    const res = await changeRole({ id: email, role });
    if (res.error) {
      toast.error("Failed to change role. Please try again.");
    } else {
      toast.success("Role changed successfully!");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer hover:bg-[#57c7a3] dark:bg-[#57c7a3] dark:border dark:border-[#ffffff6c]">
          Add New Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#101524]">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-3 mb-2">
            <Label htmlFor="email" className="text-right">
              User Email
            </Label>
            <Select
              name="email"
              onValueChange={(value) => setData({ ...data, email: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select User Email" />
              </SelectTrigger>
              <SelectContent>
                {users?.data?.map((user: any) => (
                  <SelectItem key={user._id} value={user?._id}>
                    {user?.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="role" className="text-right">
              User Role
            </Label>
            <Select
              name="role"
              onValueChange={(value) => setData({ ...data, role: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select User Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button className="bg-teal-300 cursor-pointer" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
