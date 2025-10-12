import { ArrowRightIcon, ArrowUpIcon, CheckIcon } from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"

interface ConversationStatusProps {
    status: "unresolved" | "escalated" | "resolved"
}

const sattusConfig = {
    resolved: {
        icon: CheckIcon,
        bgColor: "bg-[#3FB62F]"
    },
    unresolved: {
        icon: ArrowRightIcon,
        bgColor: "bg-destructive"
    },
    escalated: {
        icon: ArrowUpIcon,
        bgColor: "bg-yellow-600"
    }

} as const

export const ConversationStatusIcon = ({ status }: ConversationStatusProps) => {
    const config = sattusConfig[status]
    const Icon = config.icon;
    return (
        <div className={cn("flex items-center justify-center rounded-full p-1.5 size-5", config.bgColor)}>
            <Icon className="size-3 stroke-3 text-white" />
        </div>
    )
}