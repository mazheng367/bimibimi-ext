browser.browserAction.onClicked.addListener(async (tab) => {
    await browser.tabs.create({ url: "http://bimibimi.cc/" });
});

browser.runtime.onMessage.addListener(async (message, sender) => {
    if (!sender) {
        return;
    }
    if (typeof message === "string") {
        const htmlText = await (await fetch(message)).text();
        const matches = /var\s+url\s*=\s*(['"])(.+(?!\\1))\1;/g.exec(htmlText);
        if (matches && matches.length > 1) {
            await browser.tabs.sendMessage(sender.tab?.id ?? 0, matches[matches.length - 1]);
        }
    }
});
