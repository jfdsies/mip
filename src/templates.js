define(function () {
    'use strict';

    var CACHED_ATTR = '_mip_template_cached';

    function Template() {
    }

    Template.prototype = {
        cache: function () {

        },
        render: function () {

        }
    }

    function Templates() {
        this._templates = {};
        this._solverList = {};
    }

    Templates.prototype = {
        constructor: Templates,
        Template: Template,

        _create: function (type) {
            if (!this._templates[type]) {
                var solve;
                var templateProm = this._templates[type] = new Promise(function (s) {
                    solve = s;
                });
                this._solverList[type] = solve;
            }
            return this._templates[type];
        },
        _getTemplate: function (type) {
            return this._create(type);
        },

        register: function (type, Template) {
            this._create(type);
            var solve = this._solverList[type];
            solve(new Template);
        },
        isTemplateClass: function (obj) {
            if (!obj || !obj.prototype) {
                return false;
            }
            return Template.prototype.isPrototypeOf(obj.prototype);
        },
        render: function (element, data) {
            var template = this.find(element);
            if (!template) {
                return;
            }
            var type = template.getAttribute('type');
            var templateHTML = template.innerHTML;
            return this._getTemplate(type).then(function (impl) {
                if (!template[CACHED_ATTR]) {
                    template[CACHED_ATTR] = true;
                    impl.cache(templateHTML);
                }
                return impl.render(templateHTML, data);
            });
        },
        find: function (element) {
            if (!element || element.nodeType !== 1) {
                console.error('Template parent element must be a node element');
                return null;
            }
            var templateId = element.getAttribute('template');
            var template;
            if (templateId) {
                template = document.getElementById(templateId);
            } else {
                template = element.querySelector('template');
            }
            if (!template) {
                console.error('Can not find template element');
                return null;
            }
            return template;
        },
        inheritTemplate: function () {
            function inheritor() {
                Template.apply(this, arguments);
            }
            inheritor.prototype = Object.create(Template.prototype);
            inheritor.constructor = inheritor;
            return inheritor;
        }
    };

    return new Templates;
});
