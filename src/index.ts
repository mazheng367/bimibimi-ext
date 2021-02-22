(function () {

    function removeAds() {
        console.log(new Date());
        let ads = Array.from<Element>(document.querySelectorAll("body>[id^='HM']"));
        if (!ads.length) {
            return;
        }

        let item;
        while ((item = ads.pop())) {
            document.body.removeChild(item);
        }

        ads = Array.from(document.querySelectorAll(".tuiguang"));

        while ((item = ads.pop())) {
            const parent = item.parentElement;
            if (parent) {
                parent.removeChild(item);
            }
        }
    }


    const observe = new MutationObserver(removeAds);

    observe.observe(document.body, { childList: true });

    removeAds();
}())
