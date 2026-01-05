import { client } from './client'

// Query for the optimized Hero Banners
export async function getBanners() {
  const query = `*[_type == "banner"] | order(_createdAt desc) {
    _id,
    title,
    "image": image.asset->,
    link
  }`
  return await client.fetch(query)
}

// Query for the News Section
export async function getNews() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...6] {
    _id,
    title,
    body,
    "mainImage": mainImage.asset->,
    "authorName": author->name
  }`
  return await client.fetch(query)
}