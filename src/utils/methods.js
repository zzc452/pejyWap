    export function checkBrowser() {
        let isMobile = function () {
            let u = navigator.userAgent;
            return !!u.match(/AppleWebKit.*Mobile.*/)
        }
        if (isMobile()) {
            let ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return 1 //微信客户端打开
            } else {
                return 2
            }
        } else { //pc
            return 3  
        }
    }
