import Link from "next/link"

export const runtime = 'edge'

export default async function NotFound() {
  return (
    <p>Not Found. <Link href="/" className="underline">Go Back.</Link></p>
  )
}