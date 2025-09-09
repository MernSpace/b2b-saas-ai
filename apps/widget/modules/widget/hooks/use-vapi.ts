import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        const vapiInstance = new Vapi("d8220c12-6273-45ce-9de9-dcedfe54e08b")

        setVapi(vapiInstance);

        vapiInstance.on("call-start", () => {
            setIsConnected(true)
            setIsConnecting(false)
            setTranscript([])
        })

        vapiInstance.on("call-end", () => {
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })
        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true)
        })
        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false)
        })
        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnecting(false)
        })
        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ])
            }
        })
        return () => {
            vapiInstance?.stop()
        }
    }, []);
    const startCall = () => {
        setIsConnecting(true)
        if (vapi) {
            vapi.start("aa9fff9d-8d9a-4f99-832f-9fba4b46a0e8")
        }
    }
    const endCall = () => {
        if (vapi) {
            vapi.stop()
        }
    }
    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
};
