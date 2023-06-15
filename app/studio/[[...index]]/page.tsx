'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { useUser } from '@clerk/nextjs'
"user_2QelmN4yf53ebRH9hX0Y5obYxUe"
export default function StudioPage() {
  const { user, isSignedIn } = useUser()

  if (isSignedIn && user?.id === "user_2QelmN4yf53ebRH9hX0Y5obYxUe") {
    return <NextStudio config={config} />
  } else {
    return <div className='text-4xl font-semibold w-fit mx-auto py-16'>SORRY! You Do not have Access</div>
  }
}