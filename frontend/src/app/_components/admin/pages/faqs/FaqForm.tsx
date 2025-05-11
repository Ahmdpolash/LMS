import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Upload } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { useCreateLayoutMutation } from "@/redux/features/layout/layoutApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FaqForm = () => {
  const [addFaq, { isLoading }] = useCreateLayoutMutation();
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFaq.question || !newFaq.answer || !newFaq.category) {
      return toast.error("Please fill all the fields");
    }

    const payload = {
      type: "Faq",
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category,
    };

    console.log(payload, "payload");

    try {
      const res = await addFaq(payload).unwrap();
      console.log(res);
      toast.success("FAQ Added successfully!");

      setNewFaq({
        question: "",
        answer: "",
        category: "",
      });
    } catch (error: any) {
      const message = error?.data.message ?? "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="dark:bg-[#020817] w-full h-full lg:max-w-2xl mx-auto">
        <CardContent>
          <div className="">
            <div className=" space-y-4">
              <h1 className="font-semibold text-xl">Add FAQ</h1>
              <div className="space-y-2 mb-3">
                <Label htmlFor="question">Question </Label>
                <Input
                  id="question"
                  name="question"
                  placeholder="Enter FAQ question"
                  className="dark:placeholder:text-gray-400"
                  value={newFaq.question}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, question: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  name="answer"
                  placeholder="Enter FAQ answer"
                  value={newFaq.answer}
                  onChange={(e) =>
                    setNewFaq({ ...newFaq, answer: e.target.value })
                  }
                  className="dark:placeholder:text-gray-400"
                  rows={12}
                />
              </div>

              <div className="w-full flex flex-col space-y-2">
                <label htmlFor="category">Category</label>
                <Select
                  value={newFaq.category}
                  onValueChange={(value) =>
                    setNewFaq({ ...newFaq, category: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Courses">Courses</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Access">Access</SelectItem>
                    <SelectItem value="Refunds">Refunds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4 lg:mt-6">
              <Button
                type="submit"
                className="bg-[rgb(37,150,190)] hover:bg-[rgb(37,150,190)]/80 text-white cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Add FAQ"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default FaqForm;
