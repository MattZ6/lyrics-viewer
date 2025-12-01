import { Brand } from "./components/brand";

export function Header() {
  return (
    <header className="">
      <div className="flex items-center gap-4 p-4 w-full">
        <Brand />
      </div>
    </header>
  );
}
