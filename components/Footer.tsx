export default function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container mx-auto p-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Asort. All rights reserved.
      </div>
    </footer>
  )
}