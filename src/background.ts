
const adBlockRule: chrome.declarativeNetRequest.Rule[] = [
	{
		id: 1,
		priority: 1,
		action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
		condition: {
			domains: [
				"pagead2.googlesyndication.com"
			]
		},
	},
	{
		id: 2,
		priority: 2,
		action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
		condition: {
			urlFilter: "||doubleclick.net"
		},
	},
];
const adBlockRuleIds = adBlockRule.map((v) => v.id);

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
		chrome.scripting.executeScript({
			target: {
				tabId: tabId,
				allFrames: true,
			},
			files: ["addScript.js"],
		});
	}

	public disable() {
		if (this.isEnable) {
			chrome.declarativeNetRequest.updateDynamicRules({
				removeRuleIds: adBlockRuleIds
			});
			chrome.action.setBadgeText({ text: "OFF" });
			this.isEnable = false;
		}
	}

	public enable() {
		if (!this.isEnable) {
			chrome.declarativeNetRequest.updateDynamicRules({
				addRules: adBlockRule
			});
			chrome.tabs.onUpdated.addListener(this.handle);
			chrome.action.setBadgeText({ text: "ON" });
			this.isEnable = true;
		}
	}
}

chrome.runtime.onInstalled.addListener(function() {
	const service = new YTBlock();
	chrome.action.onClicked.addListener((tab: chrome.tabs.Tab) => {
		service.toggle();
	});
});
