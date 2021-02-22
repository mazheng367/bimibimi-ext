import "@/resources/style.css"

import throttle from "lodash.throttle";

(function () {
    const playContainer = document.querySelector("#playleft");
    if (!playContainer) {
        return;
    }

    const button = document.createElement("button");
    button.classList.add("ext-full-screen-btn");
    button.textContent = "全屏显示";
    button.addEventListener("click", onFullScreen)

    playContainer.appendChild(button);

    let extFull = document.querySelector("#ext-full") as HTMLDivElement;
    if (!extFull) {
        extFull = document.createElement("div");
        extFull.setAttribute("id", "ext-full");
        extFull.classList.add("ext-full");
        document.body.appendChild(extFull);

        const video = document.createElement("video");
        video.setAttribute("controls", "");
        extFull.appendChild(video);
    }

    const extVideo = extFull.querySelector("video") as HTMLVideoElement;

    document.body.addEventListener("keyup", (event) => {
        if (event.key !== "Escape") {
            return;
        }
        extVideo.pause();
        extVideo.src = "";

        extFull.style.removeProperty("width");
        extFull.style.removeProperty("height");
    });

    function onFullScreen() {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        extFull.style.cssText += `width:${winWidth}px;height:${winHeight}px`;
        const callback = function (data: any) {
            extVideo.src = data;
            extVideo.play();
            browser.runtime.onMessage.removeListener(callback);
        }
        if (playContainer) {
            const iframe = playContainer.querySelector("iframe");
            if (iframe) {
                browser.runtime.onMessage.addListener(callback)
                browser.runtime.sendMessage(iframe.getAttribute("src"));
            }
        }
    }
})();
