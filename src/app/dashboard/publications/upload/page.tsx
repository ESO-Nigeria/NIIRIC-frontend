"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BookText,
  UploadCloud,
  File,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmModal } from "@/components/common/AlertModal";
import MultiSelectWithCreate from "@/components/common/MultiSelectWithCreate";
import PublicationUploadModal from "@/components/common/PublicationShareModal";
import RichTextEditor from "@/components/common/RichTextEditor";
import UploadedFile from "@/components/uploadedfile";
import DashboardLayout from "@/components/layouts/DashboardLayout";

import { useGetAllPublishersProfileQuery } from "@/store/features/auth/actions";
import { useUploadPublicationMutation, useUpdatePublicationMutation, useGetSectorsQuery } from "@/store/features/publications/actions";
import { selectCurrentUser } from "@/store/features/auth/selectors";
import { publicationTypeOptions } from "@/store/mockData/mockdata";
import { RootState } from "@/store";
import objectToFormData from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { handleApiError } from "@/helpers/handleApiErrors";
import { Profile } from "@/components/types/profile";

import { useSearchParams } from "next/navigation";
import { useGetPublicationByIdQuery } from "@/store/features/publications/actions";


/* -----------------------------
   Constants
----------------------------- */
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const DEFAULT_OPTIONS = {
  keywords: ["AI", "Sustainability", "Climate", "Quantum", "Machine Learning", "Data Science"],
};
/* -----------------------------
   Schema
----------------------------- */
const publicationSchema = z.object({
 publicationTypes:z.array(z.string()).min(1, "At least one publication type is required"),
title: z.string().min(1, "Title is required"),
abstract: z
  .string()
  .nullable()
  .refine(
    (val) => val === null || val.trim().length > 0,
    "Abstract cannot be empty"
  ),
publicationDate: z
  .date()
  .nullable()
  .refine((val) => val !== null, "Publication date is required"),
  doi: z.string().optional().nullable(),
  sectors: z.array(z.string()),
  keywords: z.array(z.string()),
  coAuthors: z.array(z.string()),
  contributors: z.array(z.string()),
  file: z
    .any()
    .refine((f) => !!f, "File is required")
    .refine((f) => f && f instanceof window.File, "File must be a single File")
    .refine((f) => f && f.type === "application/pdf", "Only PDF allowed")
    .refine((f) => f && f.size <= MAX_FILE_SIZE, `Max file size is 50MB`),
});

const draftSchema = publicationSchema.pick({
  title: true,
  file: true,
  publicationDate: true,
  abstract: true,
});

type FormValues = z.infer<typeof publicationSchema>;
type DraftValues = z.infer<typeof draftSchema>;

/* -----------------------------
   Component
----------------------------- */
export default function UploadPublication(): JSX.Element {
  const searchParams = useSearchParams();
  const publicationId = searchParams.get("id");
  const isEditing = !!publicationId;

  // Fetch existing publication only if editing
  const { data: publicationDetails, isLoading: isPublicationLoading } =
    useGetPublicationByIdQuery(publicationId!, { skip: !isEditing });

  const router = useRouter();
  const user = useSelector(selectCurrentUser) as any;
  // const profile = useSelector((state: RootState) => state.auth.profile) as any[] | undefined;
	const profile = useSelector( (state: RootState) => state.auth.profile, ) as any ;
  const [uploadPublication, { isLoading }] = useUploadPublicationMutation();
  const { data: sectors } = useGetSectorsQuery({});
  const { data: publishers } = useGetAllPublishersProfileQuery(
    { params: { is_publisher: true }, skip: !(user as any)?.is_superuser } as any
  ) as any;

  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormValues | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [publicationData, setPublicationData] = useState<any | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
		setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(publicationSchema),
    mode: "onChange",
    defaultValues: {
      publicationTypes: ["research"],
      title: "",
      abstract: "",
      publicationDate: null,
      doi: "",
      sectors: [],
      keywords: [],
      coAuthors: [],
      contributors: [],
      file: null,
    },
  });

  useEffect(() => {
  if (isEditing && publicationDetails) {
    reset({
      title: publicationDetails.title || "",
      abstract: publicationDetails.abstract || "",
      publicationDate: publicationDetails.publication_date
        ? new Date(publicationDetails.publication_date)
        : null,
      doi: publicationDetails.doi || "",
      sectors: publicationDetails.sectors?.map((s: any) => s.id) || [],
      publicationTypes: publicationDetails.publication_type || [],
      keywords: publicationDetails.keywords || [],
      coAuthors: publicationDetails.co_authors?.map((c: any) => c.id) || [],
      contributors: publicationDetails.contributors?.map((c: any) => c.id) || [],
      file: null, // don't prefill file for security reasons
    });
  }
}, [isEditing, publicationDetails, reset]);


  const watchedFile = watch("file");
  const publicationTypes = watch("publicationTypes") || [];

  useEffect(() => {
    if (publishers?.results)
      setFilteredProfiles(publishers.results.filter((p: any) => p.id !== profile?.id));
  }, [publishers]);

  /* -----------------------------
     File Handlers
  ----------------------------- */
  useEffect(() => {
    if (watchedFile && watchedFile instanceof window.File) {
      const url = URL.createObjectURL(watchedFile);
      setFilePreviewUrl(url);
      setFileError(null);
      return () => URL.revokeObjectURL(url);
    }
    setFilePreviewUrl(null);
  }, [watchedFile]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.includes("pdf")) return setFileError("Only PDF files are accepted");
    if (f.size > MAX_FILE_SIZE) return setFileError("File size exceeds 50MB");
    setFileError(null);
    setValue("file", f, { shouldDirty: true });
  };

  const removeFile = () => {
    setValue("file", null, { shouldDirty: true });
    setFilePreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  /* -----------------------------
     Publication Type Toggle
  ----------------------------- */
  const togglePublicationType = (type: string) => {
    const current = publicationTypes || [];
    setValue(
      "publicationTypes",
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
      { shouldDirty: true }
    );
  };

  /* -----------------------------
     Submit Logic
  ----------------------------- */
  const handleConfirm = (data: FormValues) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

const [updatePublication] = useUpdatePublicationMutation();

  const submitPublication = async (status: "published" | "draft") => {
    if (!pendingData) return setConfirmOpen(false);

    const payload = {
      author: profile?.id ?? null,
      publication_date: pendingData.publicationDate
        ? pendingData.publicationDate.toISOString().split("T")[0]
        : null,
      sectors_ids: pendingData.sectors,
      co_authors_ids: pendingData.coAuthors,
      collaborators_ids: pendingData.contributors,
      abstract: pendingData.abstract,
      title: pendingData.title,
      doi: pendingData.doi,
      publication_type: pendingData.publicationTypes ?? ["research"],
      keywords: pendingData.keywords ?? [],
      document: pendingData.file ?? null,
      status,
    };

    try {
      let res;

      // 🟩 if we’re editing, call update instead of upload
      if (isEditing && publicationId) {
        res = await updatePublication({
          id: publicationId,
          data: objectToFormData(payload),
        }).unwrap();

        toast.success(
          status === "draft"
            ? "Draft updated successfully"
            : "Publication updated successfully"
        );
      } else {
        // 🟦 normal upload flow
        res = await uploadPublication(objectToFormData(payload)).unwrap();

        if (status === "draft") {
          toast.success("Publication saved as draft successfully");
        } else {
          setShowModal(true);
          toast.success("Publication uploaded successfully");
        }
      }

      setPublicationData(res);

      if (status === "draft") {
        router.push("/dashboard/publications");
      }

      reset();
      removeFile();
    } catch (error: any) {
      toast.error("Operation failed");
      handleApiError(error);
    } finally {
      setConfirmOpen(false);
      setDraftModalOpen(false);
    }
  };

  const handleSaveDraft = () => {
    const data = watch();
		const result = draftSchema.safeParse(data);
		console.log('result', result)
	  // Safe handling
		if (result) {
			if (result.error?.message) {
        const parsedErrors = JSON.parse(result.error.message);
        console.log('first', result?.error?.message, typeof(result?.error?.message), parsedErrors)
				parsedErrors?.forEach((err: any) => {
          console.log('err', err)
					setError(err.path[0] as keyof FormValues, {
						type: "manual",
						message: err.message,
					});
				});
        toast.error("Please fill in the required fields before saving draft.");
			return;
			}
		}
    setPendingData(data as FormValues);
    setDraftModalOpen(true);
  };

  /* -----------------------------
     Render
  ----------------------------- */
  const pubTypeButtons = useMemo(() => publicationTypeOptions, []);

  return (
    <DashboardLayout>
      {/* Submit Confirmation */}
      <ConfirmModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Confirm Changes"
        description="Are you sure you want to submit?"
        confirmText="Submit"
        cancelText="Back"
        onConfirm={() => submitPublication("published")}
        isLoading={isLoading}
        note="When you click 'Submit', your publication will be uploaded."
      />

      {/* Draft Confirmation */}
      <ConfirmModal
        open={draftModalOpen}
        setOpen={setDraftModalOpen}
        title="Save as Draft"
        description="Do you want to continue editing or save and leave?"
        confirmText="Save & Leave"
        cancelText="Continue Editing"
        onConfirm={() => submitPublication("draft")}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        <form onSubmit={handleSubmit(handleConfirm)} className="mx-auto">
          <div className="mb-6 flex items-center justify-between">
          <h1 className="text-primary-green font-medium text-xl flex items-center gap-2">
            {isEditing ? "Edit Publication" : "Upload Publication"}
          </h1>

            <div className="flex gap-2">
              <Button type="button" variant="outline">Cancel</Button>
              <Button type="submit" variant="primary-green">
                Submit
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-base font-normal flex items-center gap-2">
                <span className="bg-[#D1FADF] text-[#039855] p-2 rounded-lg flex items-center justify-center">
                  <BookText className="w-4 h-4" />
                </span>
                Publication Type
              </CardTitle>
              <p className="text-sm text-[#667085]">
                You can select more than one type of publication you are uploading.
              </p>
            </CardHeader>

            <CardContent>
              {/* Publication Type Buttons */}
              <div className="flex gap-3 flex-wrap mb-4">
                {pubTypeButtons.map(({ label, icon: Icon, color, value }) => {
                  const active = publicationTypes.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => togglePublicationType(value)}
                      className={cn(
                        "px-4 py-2 rounded border flex items-center gap-2",
                        active
                          ? "bg-white border-primary-green text-primary-green"
                          : "bg-white border-gray-200 text-gray-700"
                      )}
                    >
                      <span className={clsx(color, "p-2 rounded-lg flex items-center justify-center")}>
                        <Icon className="w-4 h-4" />
                      </span>
                      {label}
                    </button>
                  );
                })}
                 {errors.publicationTypes && <p className="text-xs text-red-500 mt-1">{errors.publicationTypes.message as string}</p>}
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <Label className="mb-1.5 flex items-center gap-2">
                  <span className="bg-[#FEF0C7] text-[#F79009] p-2 rounded-lg flex items-center justify-center">
                    <UploadCloud className="w-4 h-4" />
                  </span>
                  Upload File (PDF only)
                </Label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="application/pdf"
                  id="file-upload"
                  className="hidden"
                  onChange={onFileChange}
                />
                {!filePreviewUrl ? (
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer rounded-lg border-2 border-dashed p-6 flex flex-col items-center justify-center bg-gray-50"
                  >
                    <span className="text-gray-600 mb-2 flex items-center gap-2">
                      <File className="w-5 h-5" /> Click to upload or drag and drop
                    </span>
                    <span className="text-sm text-gray-400 mb-2">Supported: PDF (Max 50MB)</span>
                    <span className={buttonVariants({ variant: "primary-green" }) + " inline-block mt-2 px-3 py-1"}>
                      Browse Files
                    </span>
                  </label>
                ) : (
                  <UploadedFile
                    file={watchedFile as File}
                    removeFile={removeFile}
                    filePreviewUrl={filePreviewUrl}
                    filename={(watchedFile as File)?.name}
                    size={((watchedFile as File)?.size / 1024 / 1024).toFixed(2) + " MB"}
                  />
                )}
                {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
                {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file.message as string}</p>}
              </div>

              {/* Title + Abstract */}
              <div className="mb-4">
                <Label className="text-base mb-1.5">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input {...register("title")} placeholder="Enter title" className="h-11" />
                {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
              </div>

              <div className="mb-4">
                <Label className="text-base mb-1.5">Abstract</Label>
                <Controller
                  name="abstract"
                  control={control}
                  render={({ field }) => <RichTextEditor value={field.value || ""} onChange={field.onChange} />}
                />
                 {errors.abstract && <p className="text-xs text-red-500 mt-1">{errors.abstract.message as string}</p>}
              </div>

              {/* Date + DOI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-base mb-1.5">Publication Date</Label>
                  <Controller
                    control={control}
                    name="publicationDate"
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                        className="w-full h-11 px-3 border rounded"
                        placeholderText="MM/YYYY"
                      />
                    )}
                  />
                   {errors.publicationDate && <p className="text-xs text-red-500 mt-1">{errors.publicationDate.message as string}</p>}
                </div>

                <div>
                  <Label className="text-base mb-1.5">DOI / External Link</Label>
                  <Input {...register("doi")} placeholder="Enter DOI or link" className="h-11" />
                </div>
              </div>

              {/* MultiSelects */}
              <MultiSelectWithCreate
                label="Sectors"
                name="sectors"
                control={control}
                options={sectors?.map((p: any) => ({ label: p.name, value: p.id })) ?? []}
              />
              <MultiSelectWithCreate
                label="Keywords"
                name="keywords"
                control={control}
                options={DEFAULT_OPTIONS.keywords}
              />
              <MultiSelectWithCreate
                label="Co-Authors"
                name="coAuthors"
                control={control}
                options={filteredProfiles.map((p) => ({
                  label: `${p.first_name} ${p.last_name}`,
                  value: p.id,
                }))}
              />
              <MultiSelectWithCreate
                label="Contributors"
                name="contributors"
                control={control}
                options={filteredProfiles.map((p) => ({
                  label: `${p.first_name} ${p.last_name}`,
                  value: p.id,
                }))}
              />

              {/* Actions */}
              <div className="mt-6 flex gap-4 justify-end">
                <Button type="button" variant="ghost" onClick={handleSaveDraft}>
                  Save as Draft
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit" variant="primary-green" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Success Modal */}
      <PublicationUploadModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        publication={{
          title: publicationData?.title || "",
          abstract: publicationData?.abstract || "",
          tags: publicationData?.publication_types || [],
          thumbnail: publicationData?.thumbnail || "",
          publicationLink: publicationData?.document || "",
          id: publicationData?.id || "",
        }}
        successTitle="Publication uploaded successfully!"
        successMessage="Your publication has been successfully uploaded."
        primaryAction={{
          label: "View Publication",
          onClick: () => router.push(`/dashboard/publications/${publicationData?.id}` || "/"),
        }}
        secondaryAction={{
          label: "Close",
          onClick: () => setShowModal(false),
        }}
      />
    </DashboardLayout>
  );
}
