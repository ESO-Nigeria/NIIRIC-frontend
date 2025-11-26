import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";

interface CommentFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function CommentForm({
  value,
  onChange,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CommentFormProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor="new-comment"
        className="block text-base font-normal text-gray-700"
      >
        Write your Comment<span className="text-red-600">*</span>
      </label>
      <Textarea
        id="new-comment"
        rows={16}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your comment..."
      />
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          className="w-[216px] h-11 shadow-none"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary-green"
          onClick={onSubmit}
          className="w-[216px] h-11 shadow-none"
          disabled={!value.trim() || isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
