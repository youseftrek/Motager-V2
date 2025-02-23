"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useBuilder } from "@/providers/builder-context-provider";
import { Palette } from "lucide-react";

const CurrentThemePageSelect = () => {
  const { state, dispatch } = useBuilder();
  return (
    <Select
      onValueChange={(value) => {
        const page = JSON.parse(value);
        dispatch({
          type: "SELECT_PAGE",
          payload: page,
        });
      }}
    >
      <SelectTrigger className="hover:bg-card/50 mx-0.5 mt-2 w-[99%] h-[50px] transition-all duration-200 hover:cursor-pointer">
        <div className="flex justify-between items-center gap-2 py-1 rounded-md h-max transition-all duration-200 hover:cursor-pointer">
          <div className="flex items-center gap-2">
            <Palette
              size={34}
              className="bg-primary/15 p-1.5 rounded-full text-primary"
            />
            <div className="rtl:text-right flex flex-col text-left">
              <h3 className="font-semibold">{state.selectedTheme?.name}</h3>
              <p className="text-muted-foreground text-sm">
                {state.selectedPage?.name}
              </p>
            </div>
          </div>
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {state.selectedTheme?.pages.map((page) => (
            <SelectItem key={page.name} value={JSON.stringify(page)}>
              {page.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CurrentThemePageSelect;
