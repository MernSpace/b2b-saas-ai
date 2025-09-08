"use client"

import { useOrganization } from "@clerk/nextjs"
import { OrgSelectView } from "@/modules/auth/ui/views/org-select-view"

export const OrganizationGuard = ({ children }: { children: React.ReactNode }) => {
    const { organization } = useOrganization()

    if (!organization) {
        return (
            <div>
                <OrgSelectView />
            </div>
        )
    }
    return (
        < >
            {children}
        </>
    )
}