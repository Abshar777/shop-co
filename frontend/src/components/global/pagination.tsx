import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@heroui/button";
import { ChevronLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function PaginationDemo({ totalPages, onPageChange }: PaginationProps) {
  const current = useSearchParams();
  const page = current.get("page");
  const currentPage = page ? parseInt(page) : 1;
  return (
    <Pagination className="w-full">
      <PaginationContent className="flex w-full items-center justify-between">
        <PaginationItem>
          <Button className="bg-gray-300/30 rounded-full hover:scale-105 transition-all duration-300 border-input p-1">
            <PaginationPrevious
              className="w-full rounded-full hover:bg-transparent"
              href="#"
            />
          </Button>
        </PaginationItem>
        <div className="md:flex hidden items-center gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem className="" key={index}>
              <PaginationLink
                href={`?page=${index + 1}`}
                isActive={index + 1 === currentPage}
                onClick={() => onPageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </div>
        <div className="md:hidden flex items-center gap-2">
          <PaginationItem>
            <PaginationLink href={`?page=${currentPage}`} isActive={true}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        </div>
        <PaginationItem>
          <Button className="bg-gray-300/30 rounded-full hover:scale-105 transition-all duration-300 border-input p-1">
            <PaginationNext
              className="w-full rounded-full hover:bg-transparent"
              href="#"
            />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
