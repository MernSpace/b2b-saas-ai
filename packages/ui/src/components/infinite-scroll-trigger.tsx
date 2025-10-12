import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"

interface InfiniteScrollTriggerProps {
    canLoadMore: boolean;
    isLoadingMore: boolean;
    onLoadMore: () => void;
    loadMoreText?: string;
    noMoretext?: string;
    className?: string;
    ref?: React.Ref<HTMLDivElement>
}

export const InfiniteScrollTrigger = ({
    canLoadMore,
    isLoadingMore,
    onLoadMore,
    loadMoreText = "Load more",
    noMoretext = "No more items",
    className,
    ref


}: InfiniteScrollTriggerProps) => {
    let text = loadMoreText;
    if (isLoadingMore) {
        text = "Loading..."
    } else if (!canLoadMore) {
        text = noMoretext
    }
    return (
        <div className={cn("flex w-full justify-center py-2", className)} ref={ref}>
            <Button
                disabled={!canLoadMore || isLoadingMore}
                onClick={onLoadMore}
                size={"sm"}
                variant={"ghost"}
            >
                {text}
            </Button>
        </div>
    )
}