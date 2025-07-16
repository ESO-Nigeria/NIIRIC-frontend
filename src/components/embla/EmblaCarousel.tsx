"use client";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import {
	NextButton,
	PrevButton,
	usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

type ControllerType = "arrows" | "dots";
type ControllerPosition = "top" | "bottom" | "left" | "right";

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
	slidesToShow?: number; // Number of slides visible at once
	controllerType?: ControllerType;
	controllerPosition?: ControllerPosition;
};

const EmblaCarousel: React.FC<PropType> = ({
	slides,
	options,
	slidesToShow = 1,
	controllerType = "arrows",
	controllerPosition = "bottom",
}) => {
	// Merge slidesToShow into options
	const mergedOptions = {
		...options,
		slidesToScroll: 1,
		align: "start",
		dragFree: false,
		containScroll: "trimSnaps",
		...(slidesToShow ? { slidesToScroll: slidesToShow } : {}),
	};
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			...mergedOptions,
			slidesToScroll: 1,
			align: "start",
			dragFree: false,
			containScroll: "trimSnaps",
			...(slidesToShow ? { slidesToScroll: slidesToShow } : {}),
		},
		[Autoplay()],
	);

	// Responsive slidesToShow (optional, you can enhance this)
	const [visibleSlides, setVisibleSlides] = useState(slidesToShow);
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setVisibleSlides(1);
			else if (window.innerWidth < 1024)
				setVisibleSlides(Math.min(2, slides.length));
			else setVisibleSlides(slidesToShow);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [slidesToShow, slides.length]);

	const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
		const autoplay = emblaApi?.plugins()?.autoplay;
		if (!autoplay) return;

		const resetOrStop =
			autoplay.options.stopOnInteraction === false
				? autoplay.reset
				: autoplay.stop;

		resetOrStop();
	}, []);

	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
		emblaApi,
		onNavButtonClick,
	);

	const {
		prevBtnDisabled,
		nextBtnDisabled,
		onPrevButtonClick,
		onNextButtonClick,
	} = usePrevNextButtons(emblaApi, onNavButtonClick);

	// Controller position classes
	const controllerPositionClass =
		controllerPosition === "top"
			? "mb-4 flex justify-center"
			: controllerPosition === "bottom"
				? "mt-4 flex justify-center"
				: controllerPosition === "left"
					? "mr-4 flex flex-col items-start"
					: "ml-4 flex flex-col items-end";

	// Render controllers based on type
	const renderControllers = () => {
		if (controllerType === "arrows") {
			return (
				<div className="flex gap-2">
					<PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
					<NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
				</div>
			);
		}
		if (controllerType === "dots") {
			return (
				<div className="flex gap-2">
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index + 1}
							onClick={() => onDotButtonClick(index)}
							className={"embla__dot".concat(
								index === selectedIndex ? " embla__dot--selected" : "",
							)}
						/>
					))}
				</div>
			);
		}
		return null;
	};

	// Calculate slide width for visibleSlides
	const slideWidth = `${100 / visibleSlides}%`;

	return (
		<section className="embla">
			{/* Controller at top or left */}
			{(controllerPosition === "top" || controllerPosition === "left") && (
				<div className={controllerPositionClass}>{renderControllers()}</div>
			)}

			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{slides.map((index) => (
						<div
							className="embla__slide"
							key={index}
							style={{ flex: `0 0 ${slideWidth}` }}
						>
							<div className="embla__slide__number">{index + 1}</div>
						</div>
					))}
				</div>
			</div>

			{/* Controller at bottom or right */}
			{(controllerPosition === "bottom" || controllerPosition === "right") && (
				<div className={controllerPositionClass}>{renderControllers()}</div>
			)}
		</section>
	);
};

export default EmblaCarousel;
