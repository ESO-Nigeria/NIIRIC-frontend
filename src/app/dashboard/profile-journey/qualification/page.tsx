"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Plus, Pencil } from "lucide-react";
import { useState } from "react";
import { useUpdateUserQualificationMutation } from "@/store/features/auth/actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { roles } from "@/store/mockData/mockdata";
import { ConfirmModal } from "@/components/common/AlertModal";

// ✅ Schema
const qualificationSchema = z.object({
  department: z.string().min(1, "Department is required"),
  position: z.string().min(1, "Position is required"),
  institution: z.string().min(1, "institution/Organization is required"),
});

const formSchema = z.object({
  qualifications: z.array(qualificationSchema),
});

type FormValues = z.infer<typeof formSchema>;

export default function QualificationForm() {
  const [locked, setLocked] = useState<boolean[]>([false]);
  const [updateUserQualification] = useUpdateUserQualificationMutation();
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qualifications: [{ department: "", position: "", institution: "" }],
    },
  });
    const [open, setOpen] = useState(false);
  
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "qualifications",
  });

 async function onSubmit(values: FormValues) {
     try {
          const {data, error} = await updateUserQualification(values?.qualifications)
          console.log(data, 'response')
          if(data){
            router.push('/dashboard')
            toast.success("successful");
          }
          if (error) {
             toast.error("Error registering");
          }
        } catch (error) {
          console.log(error, "error");
          toast.error("Error registering");
        }
    console.log("✅ Form Submitted:", values);
  }

  const lockBlock = (index: number) => {
    setLocked((prev) => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });
  };

  const unlockBlock = (index: number) => {
    setLocked((prev) => {
      const copy = [...prev];
      copy[index] = false;
      return copy;
    });
  };

   const handleOpenModal = async () => {
      const isValid = await form.trigger(); 
      if (isValid) {
        setOpen(true);
      } else {
        toast.error("Please fix form errors before submitting");
      }
    };

  return (
    <Card className="shadow-none border-none p-7 font-poppins">
      <CardContent className="space-y-6 p-0">
        {/* Header */}
        <div>
          <div className="flex items-start gap-2 mb-2">
            <div className="rounded-xl bg-[#FEF0C7] text-[#DC6803] p-2 size-8 flex items-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-normal">Qualification</h2>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Add your educational background and degrees
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => {
              const isLocked = locked[index];
              const blockValid =
                form.watch(`qualifications.${index}.department`) &&
                form.watch(`qualifications.${index}.position`) &&
                form.watch(`qualifications.${index}.institution`);

              return (
                <div key={field.id} className=" space-y-4 relative">
                  {/* Department + Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`qualifications.${index}.department`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Department <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLocked}
                            >
                              <SelectTrigger className="w-full !h-11 focus-visible:ring-0">
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cs">
                                  Computer Science
                                </SelectItem>
                                <SelectItem value="eng">Engineering</SelectItem>
                                <SelectItem value="med">Medicine</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`qualifications.${index}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Position <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLocked}
                            >
                              <SelectTrigger className="w-full !h-11 focus-visible:ring-0">
                                <SelectValue placeholder="Select Position" />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map((role) => (
                                <SelectItem key={role.value} value={role.value}>
                                  {role.label}
                                </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* institution */}
                  <FormField
                    control={form.control}
                    name={`qualifications.${index}.institution`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          institution or Organization{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter name"
                            {...field}
                            className="h-11 focus-visible:ring-0"
                            disabled={isLocked}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3">
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="w-[215px] text-destructive border-destructive"
                        onClick={() => remove(index)}
                      >
                        Delete
                      </Button>
                    )}
                    {!isLocked ? (
                      <Button
                        type="button"
                        variant="primary-green"
                        className="w-[215px]"
                        disabled={!blockValid}
                        onClick={() => lockBlock(index)}
                      >
                        Save Changes
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        variant="primary-green"
                        className="w-[215px]"
                        onClick={() => unlockBlock(index)}
                      >
                        <Pencil className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    )}
                  </div>

                  {/* Separator */}
                  <div className="border-t pt-4 mt-4" />
                </div>
              );
            })}

            {/* Final Submit */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                className="flex-1 text-primary-green"
                onClick={() =>
                  append({
                    department: "",
                    position: "",
                    institution: "",
                  })
                }
                disabled={!locked[locked.length - 1]} // ✅ Only enable when last block is locked
              >
                <Plus className="h-4 w-4 mr-1" /> Add Another Qualification
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-[215px] "
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleOpenModal}
                variant="primary-green"
                className="w-[215px]"
                disabled={!locked.every(Boolean)} // ✅ Only enable when all blocks are locked
              >
                Save All Changes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
       <ConfirmModal
              open={open}
              setOpen={setOpen}
              title="Confirm Changes"
              description="Are you sure you want to submit?"
              confirmText="Submit "
              cancelText="Back"
              onConfirm={form.handleSubmit(onSubmit)}
              note="When you click 'Yes, Submit', your qualifications will be updated."
            />
    </Card>
  );
}
