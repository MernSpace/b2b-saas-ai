"use client"
import { useAtomValue } from "jotai"
import { WidgetFooter } from "../components/widget-footer"
import { WidgetHeader } from "../components/widget-header"
import { WidgetAuthScreen } from "../screens/widget-auth-screen"
import { screenAtom } from "../../atoms/widget-atoms"
import { WidgetErrorScreen } from "../screens/widget-error-screen"
import { WidgetLoadingScreen } from "../screens/widget-loading-screen"

interface Props {
    organizationId: string | null
}


export const WidgetView = ({ organizationId }: Props) => {
    const screen = useAtomValue(screenAtom)
    const screenComponent = {
        error: <WidgetErrorScreen />,
        loading: <WidgetLoadingScreen organizationId={organizationId} />,
        auth: <WidgetAuthScreen />,
        voice: <p>TODO</p>,
        inbox: <p>TODO</p>,
        selection: <p>TODO</p>,
        chat: <p>TODO</p>,
        contact: <p>TODO</p>,
    }
    return (
        <main className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-muted min-h-screen min-w-screen">
            {screenComponent[screen]}
        </main>
    )
}