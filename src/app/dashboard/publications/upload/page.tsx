"use client";

import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import { Controller, UseFormSetValue, UseFormWatch, UseFormReset, UseFormSetError, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BookText, UploadCloud, File } from "lucide-react";

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
import {
  useUploadPublicationMutation,
  useUpdatePublicationMutation,
  useGetSectorsQuery,
  useGetPublicationByIdQuery,
} from "@/store/features/publications/actions";
import { selectCurrentUser } from "@/store/features/auth/selectors";
import { publicationTypeOptions } from "@/store/mockData/mockdata";
import { RootState } from "@/store";
import objectToFormData from "@/helpers/helpers";
import { cn } from "@/lib/utils";
import { handleApiError } from "@/helpers/handleApiErrors";

/* ============================= CONSTANTS ============================= */
const MAX_FILE_SIZE = 50 * 1024 * 1024;
const DEFAULT_KEYWORDS = [
  "AI",
  "Sustainability",
  "Climate",
  "Quantum",
  "Machine Learning",
  "Data Science",
];

/* ============================= SCHEMAS ============================= */
const publicationSchema = z.object({
  publicationTypes: z
    .array(z.string())
    .min(1, "At least one publication type is required"),
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

// Schema for editing - file is optional if document exists
const editPublicationSchema = z.object({
  publicationTypes: z
    .array(z.string())
    .min(1, "At least one publication type is required"),
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
    .optional()
    .nullable()
    .refine((f) => !f || f instanceof window.File, "File must be a single File")
    .refine((f) => !f || f.type === "application/pdf", "Only PDF allowed")
    .refine((f) => !f || f.size <= MAX_FILE_SIZE, `Max file size is 50MB`),
});

const draftSchema = publicationSchema.pick({
  title: true,
  file: true,
  publicationDate: true,
  abstract: true,
});

type FormValues = z.infer<typeof publicationSchema>;
type EditFormValues = z.infer<typeof editPublicationSchema>;

/* ============================= HOOKS ============================= */
const useFileUpload = (
  setValue: UseFormSetValue<FormValues | EditFormValues>,
  watch: UseFormWatch<FormValues | EditFormValues>
) => {
  const [fileError, setFileError] = useState<string | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const watchedFile = watch("file");

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
    if (!f.type.includes("pdf")) {
      setFileError("Only PDF files are accepted");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError("File size exceeds 50MB");
      return;
    }
    setFileError(null);
    setValue("file", f, { shouldDirty: true });
  };

  const removeFile = () => {
    setValue("file", null, { shouldDirty: true });
    setFilePreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return {
    fileRef,
    fileError,
    filePreviewUrl,
    watchedFile,
    onFileChange,
    removeFile,
  };
};

const usePublicationSubmit = (
  profile: any,
  publicationId: string | null,
  isEditing: boolean,
  reset: UseFormReset<FormValues | EditFormValues>,
  removeFile: () => void,
  refetchPublication?: () => void
) => {
  const router = useRouter();
  const [uploadPublication, { isLoading: isUploading }] =
    useUploadPublicationMutation();
  const [updatePublication, { isLoading: isUpdating }] =
    useUpdatePublicationMutation();
  const [showModal, setShowModal] = useState(false);
  const [publicationData, setPublicationData] = useState<any | null>(null);

  const isLoading = isUploading || isUpdating;

  const submitPublication = async (
    pendingData: FormValues | EditFormValues,
    status: "published" | "draft"
  ) => {
    const payload: Record<string, any> = {
      author: profile?.id ?? null,
      publication_date: pendingData.publicationDate
        ? pendingData.publicationDate.toISOString().split("T")[0]
        : null,
      sectors_ids: pendingData.sectors,
      sectors: pendingData.sectors,
      co_authors_ids: pendingData.coAuthors,
      collaborators_ids: pendingData.contributors,
      abstract: pendingData.abstract,
      title: pendingData.title,
      doi: pendingData.doi,
      publication_type: (pendingData.publicationTypes ?? ["research"]).map(
        (type: string) => type
      ),
      keywords: pendingData.keywords?.map((key: string) => key) ?? [],
      document: pendingData.file ?? null,
      status,
    };

    try {
      let res: any;

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
        res = await uploadPublication(objectToFormData(payload)).unwrap();

        if (status === "draft") {
          toast.success("Publication saved as draft successfully");
        } else {
          setShowModal(true);
          toast.success("Publication uploaded successfully");
        }
      }

      setPublicationData(res);
      if (refetchPublication) refetchPublication();
      if (status === "draft") {
        router.push("/dashboard/publications");
      }

      reset();
      removeFile();
      return true;
    } catch (error: any) {
      toast.error("Operation failed");
      handleApiError(error);
      return false;
    }
  };

  return {
    submitPublication,
    isLoading,
    showModal,
    setShowModal,
    publicationData,
  };
};

/* ============================= COMPONENTS ============================= */
interface PublicationTypeSelectorProps {
  publicationTypes: string[];
  onToggle: (type: string) => void;
  error?: string;
}

const PublicationTypeSelector: React.FC<PublicationTypeSelectorProps> = ({
  publicationTypes,
  onToggle,
  error,
}) => {
  const pubTypeButtons = useMemo(() => publicationTypeOptions, []);

  return (
    <div>
      <div className="flex gap-3 flex-wrap mb-4">
        {pubTypeButtons.map(({ label, icon: Icon, color, value }) => {
          const active = publicationTypes.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => onToggle(value)}
              className={cn(
                "px-4 py-2 rounded border flex items-center gap-2",
                active
                  ? "bg-white border-primary-green text-primary-green"
                  : "bg-white border-gray-200 text-gray-700"
              )}
            >
              <span
                className={clsx(
                  color,
                  "p-2 rounded-lg flex items-center justify-center"
                )}
              >
                <Icon className="w-4 h-4" />
              </span>
              {label}
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

interface FileUploadSectionProps {
  fileRef: React.RefObject<HTMLInputElement | null>;
  filePreviewUrl: string | null;
  watchedFile: File | null;
  fileError: string | null;
  formError?: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  fileRef,
  filePreviewUrl,
  watchedFile,
  fileError,
  formError,
  onFileChange,
  removeFile,
}) => (
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
        <span className="text-sm text-gray-400 mb-2">
          Supported: PDF (Max 50MB)
        </span>
        <span
          className={
            buttonVariants({ variant: "primary-green" }) +
            " inline-block mt-2 px-3 py-1"
          }
        >
          Browse Files
        </span>
      </label>
    ) : (
      <UploadedFile
        file={watchedFile as File}
        removeFile={removeFile}
        filePreviewUrl={filePreviewUrl}
        filename={watchedFile?.name || ""}
        size={((watchedFile?.size || 0) / 1024 / 1024).toFixed(2) + " MB"}
      />
    )}
    {fileError && <p className="text-xs text-red-500 mt-1">{fileError}</p>}
    {formError && <p className="text-xs text-red-500 mt-1">{formError}</p>}
  </div>
);

/* ============================= MAIN COMPONENT ============================= */
export default function UploadPublication(): JSX.Element {
  const searchParams = useSearchParams();
  const publicationId = searchParams.get("id");
  const isEditing = !!publicationId;

  const {
    data: publicationDetails,
    isLoading: isPublicationLoading,
    refetch: refetchPublication,
  } = useGetPublicationByIdQuery(publicationId!, { skip: !isEditing });

  const router = useRouter();
  const user = useSelector(selectCurrentUser);
  const profile = useSelector((state: RootState) => state.auth.profile);
  const { data: sectors } = useGetSectorsQuery({});
  const { data: publishers } = useGetAllPublishersProfileQuery({
    params: { is_publisher: true },
    skip: !(user as any)?.is_superuser,
  } as any);

  const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [pendingData, setPendingData] = useState<FormValues | EditFormValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues | EditFormValues>({
    resolver: zodResolver(
      isEditing && publicationDetails?.document
        ? editPublicationSchema
        : publicationSchema
    ) as any,
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

  const {
    fileRef,
    fileError,
    filePreviewUrl,
    watchedFile,
    onFileChange,
    removeFile,
  } = useFileUpload(setValue, watch);

  const {
    submitPublication,
    isLoading,
    showModal,
    setShowModal,
    publicationData,
  } = usePublicationSubmit(
    profile,
    publicationId,
    isEditing,
    reset,
    removeFile,
    refetchPublication
  );

  const publicationTypes = watch("publicationTypes") || [];

  // Load existing publication data when editing
  useEffect(() => {
    if (isEditing && publicationDetails) {
      const resetData = {
        title: publicationDetails.title || "",
        abstract: publicationDetails.abstract || "",
        publicationDate: publicationDetails.publication_date
          ? new Date(publicationDetails.publication_date)
          : null,
        doi: publicationDetails.doi || "",
        sectors: publicationDetails.sectors?.map((s: any) => String(s.id)) || [],
        publicationTypes: publicationDetails.publication_type || ["research"],
        keywords: publicationDetails.keywords || [],
        coAuthors: publicationDetails.co_authors?.map((c: any) => String(c.id)) || [],
        contributors:
          publicationDetails.collaborators?.map((c: any) => String(c.id)) || [],
        file: null,
      };

      reset(resetData);

      // Explicitly set abstract to ensure RichTextEditor updates
      if (publicationDetails.abstract) {
        setValue("abstract", publicationDetails.abstract, {
          shouldDirty: false,
          shouldValidate: false,
        });
      }
    }
  }, [isEditing, publicationDetails, reset, setValue]);

  // Filter publishers
  useEffect(() => {
    if (publishers?.results) {
      setFilteredProfiles(
        publishers.results.filter((p: any) => p.id !== (profile as any)?.id)
      );
    }
  }, [publishers, profile]);

  const togglePublicationType = (type: string) => {
    const current = publicationTypes || [];
    setValue(
      "publicationTypes",
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type],
      { shouldDirty: true }
    );
  };

  const handleConfirm: SubmitHandler<FormValues | EditFormValues> = (data) => {
    setPendingData(data);
    setConfirmOpen(true);
  };

  const handleSaveDraft = () => {
    const data = watch();
    const result = draftSchema.safeParse(data);

    if (!result.success) {
      try {
        const parsedErrors = JSON.parse(result.error.message);
        parsedErrors?.forEach((err: any) => {
          setError(err.path[0] as keyof FormValues, {
            type: "manual",
            message: err.message,
          });
        });
      } catch (e) {
        // Fallback if parsing fails
        toast.error("Validation failed. Please check all required fields.");
      }
      toast.error("Please fill in the required fields before saving draft.");
      return;
    }

    setPendingData(data as FormValues);
    setDraftModalOpen(true);
  };

  // Check if existing document exists
  const hasExistingDocument = isEditing && publicationDetails?.document;

  const handleSubmitConfirmed = async () => {
    if (!pendingData) {
      setConfirmOpen(false);
      return;
    }
    const success = await submitPublication(pendingData, "published");
    if (success) setConfirmOpen(false);
  };

  const handleDraftConfirmed = async () => {
    if (!pendingData) {
      setDraftModalOpen(false);
      return;
    }
    const success = await submitPublication(pendingData, "draft");
    if (success) setDraftModalOpen(false);
  };

  return (
    <DashboardLayout>
      <ConfirmModal
        open={confirmOpen}
        setOpen={setConfirmOpen}
        title="Confirm Changes"
        description="Are you sure you want to submit?"
        confirmText="Submit"
        cancelText="Back"
        onConfirm={handleSubmitConfirmed}
        isLoading={isLoading}
        note="When you click 'Submit', your publication will be uploaded."
      />

      <ConfirmModal
        open={draftModalOpen}
        setOpen={setDraftModalOpen}
        title="Save as Draft"
        description="Do you want to continue editing or save and leave?"
        confirmText="Save & Leave"
        cancelText="Continue Editing"
        onConfirm={handleDraftConfirmed}
      />

      <div className="min-h-screen bg-gray-50 p-6">
        <form onSubmit={handleSubmit(handleConfirm)} className="mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-primary-green font-medium text-xl flex items-center gap-2">
              {isEditing ? "Edit Publication" : "Upload Publication"}
            </h1>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary-green"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
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
                You can select more than one type of publication you are
                uploading.
              </p>
            </CardHeader>

            <CardContent>
              <PublicationTypeSelector
                publicationTypes={publicationTypes}
                onToggle={togglePublicationType}
                error={errors.publicationTypes?.message}
              />

              <FileUploadSection
                fileRef={fileRef}
                filePreviewUrl={filePreviewUrl}
                watchedFile={watchedFile}
                fileError={fileError}
                formError={errors.file?.message as string}
                onFileChange={onFileChange}
                removeFile={removeFile}
              />

              {/* Show existing document info when editing */}
              {hasExistingDocument && !watchedFile && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Current document:</strong>{" "}
                    {publicationDetails?.document?.split("/").pop() || "Unknown"}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Upload a new file to replace the existing document (optional)
                  </p>
                </div>
              )}

              <div className="mb-4">
                <Label className="text-base mb-1.5">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("title")}
                  placeholder="Enter title"
                  className="h-11"
                />
                {errors.title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Label className="text-base mb-1.5">Abstract</Label>
                <Controller
                  name="abstract"
                  control={control}
                  render={({ field }) => (
                    <RichTextEditor
                      value={field.value || ""}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                    />
                  )}
                />
                {errors.abstract && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.abstract.message as string}
                  </p>
                )}
              </div>

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
                  {errors.publicationDate && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.publicationDate.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-base mb-1.5">
                    DOI / External Link
                  </Label>
                  <Input
                    {...register("doi")}
                    placeholder="Enter DOI or link"
                    className="h-11"
                  />
                </div>
              </div>

              <MultiSelectWithCreate
                label="Sectors"
                name="sectors"
                control={control}
                options={
                  sectors?.map((p: any) => ({ label: p.name, value: String(p.id) })) ??
                  []
                }
              />
              <MultiSelectWithCreate
                label="Keywords"
                name="keywords"
                control={control}
                options={DEFAULT_KEYWORDS}
              />
              <MultiSelectWithCreate
                label="Co-Authors"
                name="coAuthors"
                control={control}
                options={filteredProfiles.map((p: any) => ({
                  label: `${p.first_name || ""} ${p.last_name || ""}`.trim(),
                  value: String(p.id),
                }))}
              />
              <MultiSelectWithCreate
                label="Contributors"
                name="contributors"
                control={control}
                options={filteredProfiles.map((p: any) => ({
                  label: `${p.first_name || ""} ${p.last_name || ""}`.trim(),
                  value: String(p.id),
                }))}
              />

              <div className="mt-6 flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleSaveDraft}
                  disabled={isLoading || isEditing}
                  title={
                    isEditing
                      ? "Cannot save as draft when editing an existing publication"
                      : ""
                  }
                >
                  Save as Draft
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary-green"
                  disabled={isLoading}
                >
                  {isLoading ? "Uploading..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>

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
          onClick: () =>
            router.push(
              publicationData?.id
                ? `/dashboard/publications/${publicationData.id}`
                : "/dashboard/publications"
            ),
        }}
        secondaryAction={{
          label: "Close",
          onClick: () => setShowModal(false),
        }}
      />
    </DashboardLayout>
  );
}
