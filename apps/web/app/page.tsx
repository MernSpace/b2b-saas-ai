"use client"
import { Button } from "@workspace/ui/components/button"
import { api } from "@workspace/backend/_generated/api"
import { Authenticated, Unauthenticated, useMutation, useQuery } from "convex/react"
import { SignInButton, UserButton } from "@clerk/nextjs"

export default function Page() {
  const users = useQuery(api.users.gentMany)
  const add = useMutation(api.users.add)

  return (
    <>
      <Authenticated>

        <div className="flex items-center justify-center min-h-svh">
          <UserButton />
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Hello World</h1>
            <Button onClick={() => add} size="sm">Button</Button>

            {JSON.stringify(users)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Please login</p>
        <SignInButton />
      </Unauthenticated>
    </>
  )
}
