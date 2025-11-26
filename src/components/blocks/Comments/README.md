# Comments Component

A modular, TypeScript-first comments system with proper type safety and separation of concerns.

## Structure

```
Comments/
├── index.tsx           # Main CommentsSection component
├── types.ts            # TypeScript interfaces and types
├── CommentItem.tsx     # Individual comment display
├── CommentForm.tsx     # Comment input form
└── EmptyComments.tsx   # Empty state UI
```

## Usage

```tsx
import { CommentsSection } from "@/components/blocks/Comments";

<CommentsSection
  comments={commentsList}
  totalCount={total}
  onSubmitComment={(text) => handleSubmit(text)}
  onLike={(comment, action) => handleLike(comment.id, action)}
  filters={{ page: 1, page_size: 10 }}
  setFilters={setFilters}
  run={refreshTrigger}
  setRun={setRefreshTrigger}
/>;
```

## Props

### CommentsSection

| Prop              | Type                                                      | Required | Description                        |
| ----------------- | --------------------------------------------------------- | -------- | ---------------------------------- |
| `comments`        | `Comment[]`                                               | Yes      | Array of comment objects           |
| `totalCount`      | `number`                                                  | No       | Total number of comments           |
| `onSubmitComment` | `(comment: string) => void`                               | No       | Callback when submitting a comment |
| `onLike`          | `(comment: Comment, action: "like" \| "dislike") => void` | No       | Callback for like/dislike actions  |
| `filters`         | `CommentFilters`                                          | No       | Pagination filters                 |
| `setFilters`      | `(filters: CommentFilters) => void`                       | No       | Update pagination filters          |
| `run`             | `boolean`                                                 | No       | Trigger to reset form state        |
| `setRun`          | `(value: boolean) => void`                                | No       | Update run trigger                 |

## Features

- ✅ **Type-safe**: Full TypeScript support with proper interfaces
- ✅ **Modular**: Separated into reusable sub-components
- ✅ **Empty State**: Clean UI when no comments exist
- ✅ **Pagination**: Built-in pagination controls
- ✅ **Form Management**: Comment submission with validation
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Accessible**: Proper ARIA labels and semantic HTML

## Components

### CommentItem

Displays a single comment with user avatar, name, qualifications, and like/dislike buttons.

### CommentForm

Reusable form component for adding comments with cancel/submit actions.

### EmptyComments

Shows a friendly empty state when no comments exist.

## Backward Compatibility

The old `Comments.tsx` file still exists and re-exports from the new modular structure, so existing imports will continue to work:

```tsx
// Both of these work:
import { CommentsSection } from "@/components/blocks/Comments";
import { CommentsSection } from "@/components/blocks/Comments.tsx";
```

## Migration Guide

If you're using the old component structure, update your imports:

**Before:**

```tsx
// Old mixed types
comments={{ results: Comment[] }}
onLike={(id: string) => void}
```

**After:**

```tsx
// Clean array type
comments={Comment[]}
onLike={(comment: Comment, action: "like" | "dislike") => void}
```
