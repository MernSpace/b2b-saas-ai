"use client"
import { Button } from "@workspace/ui/components/button"
import { add } from "@workspace/math/add"
import { api } from "@workspace/backend/_generated/api"
import { useQuery } from "convex/react"
import { useVapi } from "@/modules/widget/hooks/use-vapi"

export default function Page() {
  const {
    startCall,
    endCall,
    isConnected,
    isConnecting,
    isSpeaking,
    transcript
  } = useVapi()

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>

        <Button size="sm" onClick={() => startCall()}>Button</Button>

        <Button size="sm" onClick={() => endCall()}>Button</Button>
        <p>isConnected:{`${isConnected}`}</p>
        <p>isConnecting:{`${isConnecting}`}</p>
        <p>isSpeaking:{`${isSpeaking}`}</p>
        <p>{JSON.stringify(transcript, null, 2)}</p>
      </div>
    </div>
  )
}
