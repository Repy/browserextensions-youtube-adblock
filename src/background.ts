import "./lib/WebExtensions";

declare global {
	interface Window {
		YTBlock: YTBlock;
	}
}

class YTBlock {
	public constructor() {
		this.isEnable = false;
		this.enable();
	}
	public isEnable: boolean;

	public toggle() {
		if (this.isEnable) {
			this.disable();
		} else {
			this.enable();
		}
	}

	public handle(tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab): void {
		if (tab.url?.startsWith("https://www.youtube.com/") || tab.url?.startsWith("https://music.youtube.com/")) {
			browser.tabs.executeScript(tabId, {
				file: "executeScript.js",
			});
		}
	}

	public webRequestHandle(details: chrome.webRequest.WebRequestBodyDetails) {
		return { cancel: true };
	}

	public disable() {
		if (this.isEnable) {
			browser.webRequest.onBeforeRequest.removeListener(this.webRequestHandle);
			browser.tabs.onUpdated.removeListener(this.handle);
			browser.browserAction.setBadgeText({ text: "OFF" });
			this.isEnable = false;
		}
	}

	public enable() {
		if (!this.isEnable) {
			browser.webRequest.onBeforeRequest.addListener(
				this.webRequestHandle,
				{
					urls: [
						"https://www.youtube.com/pagead/*",
						"https://*.doubleclick.net/*",
						"https://pagead2.googlesyndication.com/*",
					],
				},
				["blocking"]
			);
			browser.tabs.onUpdated.addListener(this.handle);
			browser.browserAction.setBadgeText({ text: "ON" });
			this.isEnable = true;
		}
	}
}

window.YTBlock = new YTBlock();

browser.browserAction.onClicked.addListener((tab: chrome.tabs.Tab) => {
	window.YTBlock.toggle();
});

