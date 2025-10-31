import React from 'react';
import { HiOutlineInbox } from 'react-icons/hi';

interface EmptyStateProps {
  /** The main message to display */
  message?: string;
  /** Optional React Icon component (from react-icons or custom) */
  icon?: React.ElementType;
  /** Optional button label */
  buttonLabel?: string;
  /** Function to call when the button is clicked */
  onButtonClick?: () => void;
  /** Optional extra classNames */
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No data available',
  icon: Icon = HiOutlineInbox,
  buttonLabel,
  onButtonClick,
  className = '',
}) => {
  return (
    <div
      className={`tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center tw-py-12 tw-px-4 tw-text-gray-500 ${className}`}
    >
      <Icon className="tw-text-5xl tw-mb-4 tw-text-gray-400" />
      <p className="tw-text-base tw-font-medium tw-mb-4">{message}</p>

      {buttonLabel && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="tw-bg-primary tw-text-white tw-rounded-lg tw-px-4 tw-py-2 tw-font-medium hover:tw-bg-primary/90 tw-transition-colors"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
