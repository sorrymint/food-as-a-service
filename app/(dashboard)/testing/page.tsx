import TagBadge from "@/components/ui/tag-badge"

export default function HomePage() {
    const tags = ["ContainsMeat", "New", "LimitedTime"]

    return (
        <main className="p-8 space-y-4">
            <h1 className="text-2xl font-bold">Welcome to Food as a Service</h1>
            <p className="text-muted-foreground">Here are some product tags for demo purposes:</p>

            <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                    <TagBadge key={tag} tag={tag} />
                ))}
            </div>
        </main>
    )
}
