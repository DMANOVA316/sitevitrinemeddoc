import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "lucide-react";
import * as React from "react";
import { Badge } from "./badge.tsx";

export interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      selected,
      onChange,
      placeholder = "Sélectionner des options...",
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((item) => item !== value));
      } else {
        onChange([...selected, value]);
      }
    };

    const handleRemove = (value: string, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onChange(selected.filter((item) => item !== value));
    };

    const selectedOptions = options.filter((option) =>
      selected.includes(option.value)
    );

    const displayText = React.useMemo(() => {
      if (selected.length === 0) {
        return placeholder;
      }

      return `${selected.length} service${
        selected.length > 1 ? "s" : ""
      } sélectionné${selected.length > 1 ? "s" : ""}`;
    }, [selected, placeholder]);

    return (
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "w-full justify-between min-h-[2.5rem] h-auto",
                className
              )}
              disabled={disabled}
              {...props}
            >
              <span
                className={cn(
                  "flex-1 text-left",
                  selected.length === 0 ? "text-muted-foreground" : ""
                )}
              >
                {displayText}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput placeholder="Rechercher un service..." />
              <CommandList>
                <CommandEmpty>Aucun service trouvé.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selected.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected services display */}
        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedOptions.map((option) => (
              <Badge
                key={option.value}
                variant="secondary"
                className="relative pr-6 text-xs"
              >
                {option.label}
                <div
                  role="button"
                  tabIndex={0}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 flex items-center justify-center cursor-pointer transition-colors"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleRemove(option.value, e as any);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => handleRemove(option.value, e)}
                  aria-label={`Supprimer ${option.label}`}
                >
                  <X className="h-2.5 w-2.5 text-muted-foreground hover:text-foreground" />
                </div>
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
