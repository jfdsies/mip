define(function (require) {
    'use strict';
    var win = window;
    var util = require('./util');

    var Gesture = util.Gesture;
    var css = util.css;
    var platform = util.platform;
    var EventAction = require('./util/event-action');
    var EventEmitter = require('./util/event-emitter');
    /**
     * The mip viewer.Complement native viewer, and solve the page-level problems.
     */
    var viewer = {
        /**
         * The initialise method of viewer
         */
        init: function () {
            this.patchForIframe();
            /**
             * The gesture of document.Used by the event-action of Viewer.
             * @type {Gesture}
             * @private
             */
            this._gesture = new Gesture(document, {
                preventX: false
            });
            this.sendMessage('mippageload', {
                time: Date.now(),
                title: encodeURIComponent(document.title)
            });
            this.setupEventAction();
        },
        /**
         * The iframed state
         * @type {Boolean}
         * @public
         */
        isIframed: win !== top,
        /** 
         * Patch for iframe
         */
        patchForIframe: function () {
            // When the page in an iframe and the browser is IOS, the page can not be scrollable. So we need
            // set the style to be `height: 100%; overflow: auto` for solving this problem.
            if (platform.needSpecialScroll) {
                css([document.documentElement, document.body], {
                    height: '100%',
                    overflow: 'auto',
                    '-webkit-overflow-scrolling': 'touch'
                });
                css(document.body, 'position', 'relative');
            }
        },
        /**
         * Show the contents of the page. They are not displayed until the extensions are registered.
         */
        show: function () {
            css(document.body, {
                'opacity': 1,
                'animation': 'none'
            });
            this.trigger('load', Date.now());
        },
        /**
         * Send the message to the parent frame
         * @param {string} eventName
         * @param {Object} data Message body
         */
        sendMessage: function (eventName, data) {
            if (this.isIframed) {
                window.parent.postMessage({
                    event: eventName,
                    data: data
                }, '*');
            }
        },
        /**
         * Setup the event-action of viewer. To handle `on="tap:xxx"`.
         */
        setupEventAction: function () {
            var eventAction = this.eventAction = new EventAction();
            this._gesture.on('tap', function (event) {
                eventAction.excute('tap', event.target, event);
            });
        }
    };

    EventEmitter.mixin(viewer);

    return viewer;
});

