
console.log("aaaaa");
if (window.document.scripts.length > 0) {
	JSON.parse = null;
	var sc = window.document.createElement("script");
	sc.innerText = `
		if (!window.ORIGJSONparse) {
			console.log("adblock enable");
			window.ORIGJSONparse = JSON.parse;
			JSON.parse = function(text, reviver) {
				const res = window.ORIGJSONparse(text, reviver);
				console.log(res);
				if (res.adPlacements) {
					console.log("adblock!!");
					res.adPlacements = undefined;
				}
				if (res.playerAds) {
					console.log("adblock!!");
					res.playerAds = undefined;
				}
				return res;
			};
		}
		`;
	sc.nonce = window.document.scripts[0].nonce;
	window.document.head.appendChild(sc);
}