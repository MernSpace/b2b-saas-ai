import { v } from "convex/values";
import { action } from "../_generated/server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
})
export const validate = action({
    args: {
        organizationId: v.string()
    },
    handler: async (_, args) => {

        const organization = await clerkClient.organizations.getOrganization({
            organizationId: args.organizationId
        })
        if (organization) {

            return { void: true }
        } else {
            return { void: false, reason: "Organization not valid" }
        }

    }
})



