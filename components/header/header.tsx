"use client";

import SearchAutocomplete from "../ui/search-autocomplete";

function Header() {
  return (
    <div className="overflow-hidden w-full">
      {/* <SidebarToggle className="absolute z-40 left-4 top-4"  /> */}
      <SearchAutocomplete className="absolute z-30 top-2 left-2 right-2 sm:top-4 sm:right-4  sm:left-4  max-w-sm" />
      {/* <ModeToggle className="absolute z-30 right-4 top-4" /> */}
    </div>
  );
}
export default Header;
