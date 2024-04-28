var sc = window.document.createElement("script");
sc.innerHTML = `
	if (!window.ORIGJSONparse) {
		console.log("adblock enable");
		window.ORIGJSONparse = JSON.parse;
		JSON.parse = function(text, reviver) {
			const res = window.ORIGJSONparse(text, reviver);
			if (res.adPlacements) {
				console.log("adblock!! adPlacements");
				res.adPlacements = undefined;
			}
			if (res.playerAds) {
				console.log("adblock!! playerAds");
				res.playerAds = undefined;
			}
			if (res.adSlots) {
				console.log("adblock!! adSlots");
				res.adSlots = undefined;
			}
			return res;
		};
	}
	`;
window.document.body.appendChild(sc);
