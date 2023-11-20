import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { FaSdCard } from 'react-icons/fa';
import { Logger } from '../Logging';
import { API_URL, UNAMED_CARD_NAME } from '../const';
import { useCardsForGame } from "../../lib/src"

const logger = Logger.Child({ module: "patching" });

export default function LibraryModal({ appId: gameId }: { appId: string }): ReactElement {
	const { cards } = useCardsForGame({ url: API_URL, logger: Logger, gameId });

	var ref = useRef();

	const bottomMargin = 8;
	const height = 20;
	const [top, setTop] = useState<number>(210);

	useEffect(() => {
		logger.Debug("Processing Bounds");
		if (!ref || !ref.current) {
			logger.Debug("Couldn't get reference to HTML element");
			return;
		}
		const element = (ref.current as unknown as HTMLElement);
		const doc = element.getRootNode() as Document;

		// const playButton = document.querySelector("[class^='appactionbutton_PlayButton']");

		const imageWindow = doc.querySelector("[class^='appdetails_Header']");
		const imageWindowBounds = imageWindow?.getBoundingClientRect();
		const elementBounds = element.getBoundingClientRect()

		if (!imageWindowBounds || !elementBounds)
			return;


		const topOffset = imageWindowBounds.height - elementBounds.height - bottomMargin;
		setTop(topOffset);
		logger.Debug("Set Top to {topOffset}. Banner Height: {bannerHeight}, Element Height: {elementHeight}, Desired Bottom Margin: {bottomMargin}", {topOffset, bannerHeight: imageWindowBounds.height, elementHeight: elementBounds.height, bottomMargin})
		logger.Log("Set Top For Window bacuse of bounds", { imageWindowBounds });
	}, [cards]);

	if (!cards) {
		logger.Debug("Unable to find Card");
		return (<></>);
	}

	if (!cards.length) {
		logger.Debug("No MicroSD card could be found for {appId}", { appId: gameId });
		return (<></>);
	}

	return (
		<div
			//@ts-ignore
			ref={ref}
			className="microsdeck-app-modal"
			style={{ padding: "0.4em", borderRadius: "6px", backgroundColor: "#0c131b", position: 'absolute', height, top, left: '20px' }}
		>
			<div style={{ float: "left" }}>
				<FaSdCard size={18} />
			</div>
			<div style={{ marginLeft: "1.4rem", lineHeight: "18px", fontSize: 18, fontWeight: "bold" }} className="tab-label">
				{cards.map(v => v.name || UNAMED_CARD_NAME).join(", ")}
			</div>
		</div>
	)
}
