"use client"

import * as React from "react"

// Detect if screen size is mobile
export function useIsMobile(breakpoint: number = 768) {
    const [isMobile, setIsMobile] = React.useState<boolean>(false)

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < breakpoint)

        checkMobile() // run once on mount
        window.addEventListener("resize", checkMobile)

        return () => {
            window.removeEventListener("resize", checkMobile)
        }
    }, [breakpoint])

    return isMobile
}
