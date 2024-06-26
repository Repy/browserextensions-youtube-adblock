
interface Window {
	ytab____orig_parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
	ytab____wrapResponse(req: Response): Promise<Response>;
	ytab____orig_fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
	ytInitialPlayerResponse?: any;
}

if (!window.ytab____orig_parse) {
	console.log("adblock enable");
	window.ytab____orig_parse = JSON.parse;
	JSON.parse = function(text, reviver) {
		const res = window.ytab____orig_parse(text, reviver);
		if (res.adPlacements) {
			console.log("adblock!! adPlacements");
			res.adPlacements = [];
		}
		if (res.playerAds) {
			console.log("adblock!! playerAds");
			res.playerAds = [];
		}
		if (res.adBreakHeartbeatParams) {
			console.log("adblock!! adBreakHeartbeatParams");
			delete res.adBreakHeartbeatParams;
		}
		if (res.adSlots) {
			console.log("adblock!! adSlots");
			res.adSlots = [];
		}

		if (res.playerConfig && res.playerConfig.ssapConfig) {
			console.log("adblock!! playerConfig.ssapConfig");
			delete res.playerConfig.ssapConfig;
		}
		if (res.streamingData && res.streamingData.serverAbrStreamingUrl) {
			console.log("adblock!! streamingData.serverAbrStreamingUrl");
			delete res.streamingData.serverAbrStreamingUrl;
		}

		if (res.auxiliaryUi && res.auxiliaryUi.messageRenderers && res.auxiliaryUi.messageRenderers.bkaEnforcementMessageViewModel) {
			delete res.auxiliaryUi.messageRenderers.bkaEnforcementMessageViewModel;
		}
		return res;
	};
	if (window.ytInitialPlayerResponse) {
		window.ytInitialPlayerResponse.adBreakHeartbeatParams = undefined;
		window.ytInitialPlayerResponse.adPlacements = [];
		window.ytInitialPlayerResponse.adSlots = [];
		window.ytInitialPlayerResponse.playerAds = [];
	}
}