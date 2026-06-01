export const siteName = "Raffi Windarto"
export const siteTitle = "Raffi Windarto | Product-minded Software Engineer"
export const siteDescription =
  "Product-minded software engineer building internal products, operator software, workflow automation, and AI-assisted tools that stay calm under pressure."

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined)

  return new URL(envUrl ?? "http://localhost:3000")
}
