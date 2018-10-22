// motaJs@notify.js 1.0.5
// Very simple and lite web notification.
// (c) 2018 Jeferson Mota <jsmota.dev@gmail.com>
// This notify.js is freely distributable under the MIT license
(function (window) {
    'use strict';

    var notify = {};

    var container = document.createElement('DIV');
    container.className = 'notify-container';

    var isContainerShow = false;

    function _notify(message, messageType, timeOut) {
        timeOut = timeOut || 5000;
        var timeoutEvent;

        var body = document.getElementsByTagName('BODY')[0];

        var notifyFlag = document.createElement('DIV');

        notifyFlag.className = 'notify';
        if (messageType) notifyFlag.className = notifyFlag.className + ' ' + 'notify-' + messageType;

        var flagBody = document.createElement('DIV');
        flagBody.className = 'notify-body';
        
        var span = document.createElement('SPAN');
        var text = document.createTextNode(message);

        span.appendChild(text);
        flagBody.appendChild(span);

        notifyFlag.appendChild(flagBody);
        container.insertBefore(notifyFlag, container.firstChild);

        if (!isContainerShow) {
            body.appendChild(container);
            isContainerShow = true;
        }

        timeoutEvent = setTimeout(function () {
            if (container.contains(notifyFlag)) {
                notifyFlag.style.WebkitAnimation = 'notifySlideOut 0.5s';
                notifyFlag.style.animation = 'notifySlideOut 0.5s';
                notifyFlag.style.animationFillMode = 'forwards';

                setTimeout(function () {
                    if (container.childNodes.length != 0) {
                        try {
                            container.removeChild(notifyFlag);
                        } catch (error) {
                        }
                    }
                }, 500);
            }

            if (container.childNodes.length == 0) {
                body.removeChild(container);
                isContainerShow = false;
            }
        }, timeOut);

        if (notifyFlag.addEventListener) {
            notifyFlag.addEventListener('click', function () {
                container.removeChild(notifyFlag);
                clearTimeout(timeoutEvent);
                if (container.childNodes.length == 0) {
                    body.removeChild(container);
                    isContainerShow = false;
                }
            }, false);
        }
        else if (notifyFlag.attachEvent) {
            notifyFlag.attachEvent('onclick', function () {
                container.removeChild(notifyFlag);
                clearTimeout(timeoutEvent);
                if (container.childNodes.length == 0) {
                    body.removeChild(container);
                    isContainerShow = false;
                }
            });
        }
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
    notify.error = function (message, timeOut) {
        _notify(message, 'error', timeOut);
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

    /**
     * @function show notify | color: yellow
     * @param {string} message message that will show
     * @param {string} messageType type of message: error | info | success | warning
     * @param {number} timeOut timout message || default 5000
     */
    notify.show = function (message, messageType, timeOut) {
        _notify(message, messageType, timeOut);
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