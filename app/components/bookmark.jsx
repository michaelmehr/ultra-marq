import Link from "next/link";

export default function Bookmark({ bookmark }) {
  return (
    <li key={bookmark.id}>
      <Link href={bookmark.url}>{bookmark.title}</Link>
      <button>X</button>
    </li>
  )
}