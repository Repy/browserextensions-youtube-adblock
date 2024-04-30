
class YTBlock {
	public static async isEnable(): Promise<boolean> {
		const list = await chrome.userScripts.getScripts({
			ids: ['YTBlock'],
		});
		return list.length > 0;
	}

	public static async toggle() {
		if (await this.isEnable()) {
			this.disable();
		} else {
			this.enable();
		}
	}

	public static async disable() {
		await chrome.userScripts.unregister({
			ids: ['YTBlock'],
		});
		await chrome.action.setBadgeText({ text: "OFF" });
	}

	public static async enable() {
		if (await this.isEnable()) {
			await chrome.userScripts.unregister({
				ids: ['YTBlock'],
			});
		}
		await chrome.userScripts.register([{
			id: 'YTBlock',
			matches: ["*://*.youtube.com/*"],
			js: [{ file: "executeScript.js" }],
			world: "MAIN",
		}]);
		await chrome.action.setBadgeText({ text: "ON" });
	}
}

chrome.runtime.onInstalled.addListener(() => {
	YTBlock.enable();
});
chrome.runtime.onStartup.addListener(() => {
	YTBlock.enable();
});
chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
	YTBlock.toggle();
});
