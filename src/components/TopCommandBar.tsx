import { Menu } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { FilterChips } from './FilterChips';
export function TopCommandBar({ query, setQuery, filter, setFilter, onMenu }: { query: string; setQuery: (v: string)=>void; filter: string; setFilter: (v:string)=>void; onMenu: ()=>void }) {
  return <header className="sticky top-0 z-30 border-b border-white/10 bg-[#050714]/70 px-4 py-4 backdrop-blur-2xl lg:px-8"><div className="flex items-center gap-3"><button onClick={onMenu} className="rounded-2xl border border-white/10 p-3 text-white lg:hidden"><Menu className="h-4 w-4" /></button><SearchBar value={query} onChange={setQuery} /></div><div className="mt-3"><FilterChips active={filter} onChange={setFilter} /></div></header>;
}
