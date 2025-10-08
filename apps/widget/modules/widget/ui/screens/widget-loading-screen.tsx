"use client";
import { useAtomValue, useSetAtom } from "jotai";
import { Loader2Icon } from "lucide-react";
import { contactSessionIdAtomFamily, errorMessageAtom, loadingMessageAtom, organizationIdAtom, screenAtom } from "../../atoms/widget-atoms";
import { WidgetHeader } from "../components/widget-header";
import { useEffect, useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "@workspace/backend/_generated/api";


type InitStep = "org" | "session" | "settings" | "vapi" | "done"
export const WidgetLoadingScreen = ({ organizationId }: { organizationId: string | null }) => {
    const [step, setStep] = useState<InitStep>("org")
    const [sessionValid, setSessionValid] = useState(false)

    const setErrorMessage = useSetAtom(errorMessageAtom)
    const setLoadingMessage = useSetAtom(loadingMessageAtom)
    const setOrganizationId = useSetAtom(organizationIdAtom)

    const loadingMessage = useAtomValue(loadingMessageAtom)

    const setScreen = useSetAtom(screenAtom)

    const contactSessionId = useAtomValue(contactSessionIdAtomFamily(organizationId || ""))


    const validateOrganization = useAction(api.public.organizations.validate)
    useEffect(() => {
        if (step !== "org") {
            return;
        }
        setLoadingMessage("Loading organization ID...")
        if (!organizationId) {
            setErrorMessage("Organization ID is required")
            setScreen("error")
            return;
        }

        setLoadingMessage("Verifying organization...")
        validateOrganization({ organizationId })
            .then((result) => {
                if (result.void) {
                    setOrganizationId(organizationId)
                    setStep("session")
                } else {
                    setErrorMessage(result.reason || "Invalid configuration")
                    setScreen("error")
                }
            })
    }, [step, organizationId, setErrorMessage, setScreen, setOrganizationId, setStep, validateOrganization, setLoadingMessage])
    // Step 2: validate session (if exists)
    const validateContactSession = useMutation(api.public.contactSessions.validate)
    useEffect(() => {
        if (step !== "session") {
            return;
        }
        setLoadingMessage("Finding contact session ID...")
        if (!contactSessionId) {
            setSessionValid(false)
            setStep("done")
            return;

        }
        setLoadingMessage("Validating session...")
        validateContactSession({
            contactSessionId,
        }).then((result) => {
            setSessionValid(result.void)
            setStep("done")
        }).catch(() => {
            setSessionValid(false)
            setStep("done")
        })
    }, [step, contactSessionId, validateContactSession, setLoadingMessage])

    useEffect(() => {
        if (step !== "done") {
            return;
        }

        const hasValidSession = contactSessionId && sessionValid;
        setScreen(hasValidSession ? "selection" : "auth")
    }, [
        step, contactSessionId, sessionValid, setScreen
    ])
    return (
        <>
            <WidgetHeader>
                <div className="flex flex-col justify-between gap-y-2 px-2 py-6">
                    <p className="font-semibold text-3xl">
                        Hi there! 👋
                    </p>
                    <p className="font-semibold text-lg">
                        How can we help you today?
                    </p>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col items-center justify-center gap-y-4 p-4 text-muted-foreground">
                <Loader2Icon className="animate-spin" />
                <p className="text-sm">
                    {loadingMessage || "Loading...."}
                </p>
            </div>
        </>
    )
}