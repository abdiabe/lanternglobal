import Link from "next/link";
import { Clock } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { getBlogCategory } from "@/content/blog-categories";
import { formatDate, cn } from "@/lib/utils";

export interface BlogCardData {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readingMinutes: number;
  image: string;
  imageAlt?: string;
  author?: string;
}

export function BlogCard({ post, priority, featured }: { post: BlogCardData; priority?: boolean; featured?: boolean }) {
  const cat = getBlogCategory(post.category);
  return (
    <article
      className={cn(
        "card card-interactive group relative flex h-full flex-col overflow-hidden",
        featured && "lg:grid lg:grid-cols-[1.15fr_1fr] lg:items-stretch",
      )}
    >
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", featured && "lg:aspect-auto lg:min-h-[22rem]")}>
        <Photo
          id={post.image}
          alt={post.imageAlt}
          priority={priority}
          sizes={featured ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className={cn("flex flex-1 flex-col p-6", featured && "lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium">
          {cat && <span className="rounded-full bg-brand-soft px-2.5 py-1 font-semibold text-brand-strong">{cat.name}</span>}
          <span className="inline-flex items-center gap-1 text-muted">
            <Clock aria-hidden="true" className="h-3.5 w-3.5" /> {post.readingMinutes} min read
          </span>
        </div>
        <h3 className={cn("mt-4 font-display font-bold leading-snug text-ink", featured ? "text-2xl sm:text-3xl" : "text-lg")}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:text-brand-strong">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 leading-relaxed", featured ? "text-base" : "line-clamp-3 text-[0.9375rem]")}>{post.description}</p>
        <p className="mt-auto pt-5 text-xs text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.author && <span> · {post.author}</span>}
        </p>
      </div>
    </article>
  );
}
