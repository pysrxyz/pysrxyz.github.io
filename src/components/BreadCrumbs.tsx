import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const pages = [
  { name: "Blog", href: "/blog", current: false },
  { name: "Project Nero", href: "#", current: true },
];

export default function Breadcrumbs({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-white hover:text-gray-200">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-100"
              aria-hidden="true"
            />
            <Link
              href="/blog"
              className="ml-4 text-sm font-medium text-white hover:text-gray-200"
            >
              Blog
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-100"
              aria-hidden="true"
            />
            <Link
              href={`/blog/${href}`}
              className="ml-4 text-sm font-medium text-white hover:text-gray-200"
            >
              {name}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  );
}
