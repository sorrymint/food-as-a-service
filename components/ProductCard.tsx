import TagBadge from "@/components/ui/tag-badge"

const tags = ["ContainsMeat", "New", "LimitedTime"]

export default function ProductCard() {
    return (
        <div className="border rounded p-4 shadow-sm">
            <h3 className="text-lg font-semibold">Awesome Product</h3>
            <p className="text-muted-foreground">An insane,epic, and amazing product description goes here.</p>

            <div className="flex gap-2 flex-wrap mt-2">
                {tags.map(tag => (
                    <TagBadge key={tag} tag={tag} />
                ))}
            </div>
        </div>
    )
}
