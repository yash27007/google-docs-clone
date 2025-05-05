"use client"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils";
import { useState } from "react";
import {templates} from "@/constants/templates"

export const TemplatesGallery = () => {
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="bg-[#F1F3F4]">
            <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3 className="font-medium">Start a new document</h3>
                <Carousel>
                    <CarouselContent className="-ml-4">
                        {templates.map((template) => (
                            <CarouselItem
                                key={template.id}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                            >
                                <div className={cn(
                                    "aspect-[3/4] flex flex-col gap-y-2.5",
                                    isCreating && "pointer-events-none opacity-50"
                                )}>
                                    <button
                                        disabled={isCreating}
                                        onClick={() => {}}
                                        style={{
                                            backgroundImage: `url(${template.imgUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        className="w-full h-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex items-center justify-center bg-white"
                                    >
                                    </button>
                                    <p className="text-sm font-medium text-center truncate">{template.label}</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
        </div>
    );
}
