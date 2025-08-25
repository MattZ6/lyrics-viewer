import { Brand } from "./components/brand";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0">
      <div className="flex items-center gap-4 max-w-5xl p-4 w-full mx-auto">
        <Brand />
      </div>
    </header>
  )
}
