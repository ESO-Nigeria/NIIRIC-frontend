"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Info } from "@/app/assets/icons/icons";

interface ConfirmModalProps {
  open?: boolean; // controlled state
  setOpen?: (open: boolean) => void;
  trigger?: ReactNode; // optional trigger button/text
  title?: string;
  description?: string;
  note?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void ;
}

export function ConfirmModal({
  open,
  setOpen,
  trigger,
  title = "Confirm Changes",
  description = "Are you sure you want to submit?",
  note = "When you click 'Yes, Submit', your qualification will be added.",
  confirmText = "Yes, Submit",
  cancelText = "Back",
  onConfirm,
}: ConfirmModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}

      <AlertDialogContent className="max-w-md rounded-2xl font-dm_sans">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-dm_sans text-2xl font-medium">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base font-dm_sans">
            {description}
          </AlertDialogDescription>
          {note && (
            <div className="flex items-center justify-center gap-2 rounded-md border min-h-[104px] p-6 mt-3 text-sm text-[#5C6F7F]">
              <Info />
              <span>{note}</span>
            </div>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-between gap-3 sm:justify-between">
          <AlertDialogCancel asChild className="">
            <Button variant={"outline"} className="w-1/2 border-primary-green text-primary-green">
                {cancelText}
            </Button>
            
          </AlertDialogCancel>
          <AlertDialogAction
          asChild
          >
            <Button variant="primary-green" className="w-1/2 bg-primary-green" onClick={() => {
              onConfirm();
              setOpen?.(false);
            }}>
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
