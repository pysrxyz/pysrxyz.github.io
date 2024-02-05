import { readdirSync } from "fs";

import { BlogMetadata } from "@/utils/blog";
import { readFrontmatter } from "@/utils/markdown";
import Link from "next/link";
import { Icon } from "@/components/Icons";

export default async function BlogPage() {
  let files = readdirSync("./blogs", { withFileTypes: true });

  files = files.filter(
    (file) =>
      !file.name.startsWith(".") &&
      file.name !== "DS_Store" &&
      file.name !== "template"
  );

  files.sort((a, b) => {
    return b.name.localeCompare(a.name);
  });

  const blogs = [];
  for await (const file of files) {
    const frontmatter = await readFrontmatter(`./blogs/${file.name}/readme.md`);

    const metadata = BlogMetadata.parse({
      ...(frontmatter.data.matter as Object),
      slug: file.name,
    });
    blogs.push(metadata);
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 min-h-[100vh]">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">
            Pysr.xyz Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-200">
            Frontend to my Obsidian vault.
          </p>
          <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
            {blogs.map((blog) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.title}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={blog.date} className="text-gray-200">
                    {blog.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-800 hover:bg-gray-100">
                    {blog.tags[0]}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-100 group-hover:text-gray-300">
                    <span>
                      <span className="absolute inset-0" />
                      {blog.title}
                    </span>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-400">
                    {blog.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
