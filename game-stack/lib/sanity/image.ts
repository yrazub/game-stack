import { createImageUrlBuilder, SanityImageSource } from '@sanity/image-url'

const builder = createImageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!
});

export function urlFor(source: unknown) {
  return builder.image(source as SanityImageSource)
}