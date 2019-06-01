export default function (msg){
    let msgElm = document.createElement('div')
    msgElm.className = 'message'
    msgElm.style.cssText = `position: fixed;
                    left: 50%;
                    top: -10px;
                    opacity: .5;
                    min-width: 50px;
                    padding: 0 20px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 14px;
                    transform: translateX(-50%);
                    background: #FFF;
                    border-radius: 4px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    transition: all .3s;
    `
    msgElm.appendChild(document.createTextNode(msg))
    document.body.appendChild(msgElm)
    setTimeout(() => {
        msgElm.style.cssText += 'top: 20px;opacity: 1;'
    }, 0)
    return (ms, cb) => {
        setTimeout(() => {
            msgElm.style.cssText += 'top: -10px;opacity: 0';
            msgElm.addEventListener('transitionend', () => {
                msgElm.remove()
            })
            cb && cb()
        }, (ms || 0))
    }
}
