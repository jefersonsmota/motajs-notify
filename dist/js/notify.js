// motaJs@notify.js 1.0.0
// Very simple and lite web notification.
// (c) 2018 Jeferson Mota <jsmota.dev@gmail.com>
// This notify.js is freely distributable under the MIT license
(function (window) {
    'use strict';

    var notify = {};

    var container = document.createElement('div');
    container.classList.add('notify-container');
    var isContainerShow = false;

    function _notify(message, messageType, timeOut) {
        timeOut = timeOut || 5000;

        var body = document.getElementsByTagName('BODY')[0];

        var notifyFlag = document.createElement('div');
        notifyFlag.classList.add('notify');
        if (messageType) notifyFlag.classList.add('notify-' + messageType);

        var flagBody = document.createElement('div');
        flagBody.classList.add('notify-body');

        var span = document.createElement('span');
        var text = document.createTextNode(message);

        span.appendChild(text);
        flagBody.appendChild(span);

        notifyFlag.appendChild(flagBody);
        container.insertBefore(notifyFlag, container.firstChild);

        notifyFlag.addEventListener('click', function () {
            container.removeChild(notifyFlag);
            clearTimeout(timeoutEvent);
            if (container.childElementCount == 0) {
                body.removeChild(container);
                isContainerShow = false;
            }
        }, false);

        if (!isContainerShow) {
            body.appendChild(container);
            isContainerShow = true;
        }

        var timeoutEvent;

        timeoutEvent = setTimeout(function () {
            if (container.contains(notifyFlag)) {
                notifyFlag.style.WebkitAnimation = "notifySlideOut 0.5s";
                notifyFlag.style.animation = "notifySlideOut 0.5s";

                setTimeout(function () {
                    container.removeChild(notifyFlag);
                }, 500);
            }

            if (container.childElementCount == 0) {
                body.removeChild(container);
                isContainerShow = false;
            }
        }, timeOut);
    };

    /**
     * @function success notify | color: green
     * @param {string} message message that will show
     * @param {number} timeOut timout message || default 5000
     * @
     */
    notify.success = function (message, timeOut) {
        _notify(message, 'success', timeOut);
    };

    /**
     * @function erro notify | color: red
     * @param {string} message message that will show
     * @param {number} timeOut timout message || default 5000
     * @
     */
    notify.erro = function (message, timeOut) {
        _notify(message, '', timeOut);
    };

    /**
     * @function info notify | color: blue
     * @param {string} message message that will show
     * @param {number} timeOut timout message || default 5000
     * @
     */
    notify.info = function (message, timeOut) {
        _notify(message, 'info', timeOut);
    };

    /**
     * @function warning notify | color: yellow
     * @param {string} message message that will show
     * @param {number} timeOut timout message || default 5000
     * @
     */
    notify.warning = function (message, timeOut) {
        _notify(message, 'warning', timeOut);
    };

    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS
        module.exports = notify;
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], function () {
            return notify;
        });
    } else if (typeof (window.notify) === 'undefined') {
        // window
        window.notify = notify;
    }
}(typeof window !== 'undefined' ? window : this));