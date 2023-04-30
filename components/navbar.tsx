import React from "react";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun, CalendarDays, Github, FileSearch } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <header>
      <nav
        className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
        aria-label="Global"
      >
        <div className="flex gap-6 md:gap-10">
          <a href="#" className="flex -m-1.5 p-1.5">
            <span className="sr-only">RESUMA MEU PDF</span>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">
                  <FileSearch className="h-6 w-6" />
                  <h1 className="font-bold text-md sm:text-2xl md:text-2xl lg:text-2xl xl:text-2xl">
                    RESUMA MEU PDF
                  </h1>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex gap-2">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/74687838?s=96&v=4" />
                    <AvatarFallback>Roger Rocha</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      Construído por Roger Rocha{" "}
                    </h4>
                    <p className="text-sm">
                      Veja outros projetos no meu{" "}
                      <a
                        href="https://rogerrocha.vercel.app/"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        Site
                      </a>{" "}
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </a>
        </div>
        <div className="flex flex-1 justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <span className="sr-only">Mudar Tema</span>
                <Sun className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Claro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Escuro</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>Padrão</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
