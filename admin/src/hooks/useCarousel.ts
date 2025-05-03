"use client"
import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

export const useCarsole=()=>{
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
      });
    
      const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
      }, [emblaApi]);
    
      const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
      }, [emblaApi]);


      return {emblaRef,scrollPrev,scrollNext}
}