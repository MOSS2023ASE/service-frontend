/**
 * TOAST UI Editor : Vue Wrapper
 * @version 3.2.3 | Fri Feb 17 2023
 * @author NHN Cloud FE Development Lab <dl_javascript@nhn.com>
 * @license MIT
 */

import Editor from '@toast-ui/editor';
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var editorEvents = [
    'load',
    'change',
    'caretChange',
    'focus',
    'blur',
    'keydown',
    'keyup',
    'beforePreviewRender',
    'beforeConvertWysiwygToMarkdown',
];
var defaultValueMap = {
    initialEditType: 'markdown',
    initialValue: '',
    height: '300px',
    previewStyle: 'vertical',
};
var optionsMixin = {
    data: function () {
        var _this = this;
        var eventOptions = {};
        editorEvents.forEach(function (event) {
            eventOptions[event] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.$emit.apply(_this, __spreadArray([event], args));
            };
        });
        var options = __assign(__assign({}, this.options), { initialEditType: this.initialEditType, initialValue: this.initialValue, height: this.height, previewStyle: this.previewStyle, events: eventOptions });
        Object.keys(defaultValueMap).forEach(function (key) {
            if (!options[key]) {
                options[key] = defaultValueMap[key];
            }
        });
        return { editor: null, computedOptions: options };
    },
    methods: {
        invoke: function (methodName) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var result = null;
            if (this.editor[methodName]) {
                result = (_a = this.editor)[methodName].apply(_a, args);
            }
            return result;
        },
    },
    destroyed: function () {
        var _this = this;
        editorEvents.forEach(function (event) {
            _this.editor.off(event);
        });
        this.editor.destroy();
    },
};

//
var script$1 = {
    name: 'ToastuiEditor',
    mixins: [optionsMixin],
    props: {
        previewStyle: {
            type: String,
        },
        height: {
            type: String,
        },
        initialEditType: {
            type: String,
        },
        initialValue: {
            type: String,
        },
        options: {
            type: Object,
        },
    },
    watch: {
        previewStyle: function (newValue) {
            this.editor.changePreviewStyle(newValue);
        },
        height: function (newValue) {
            this.editor.height(newValue);
        },
    },
    mounted: function () {
        var options = __assign(__assign({}, this.computedOptions), { el: this.$refs.toastuiEditor });
        this.editor = new Editor(options);
    },
    methods: {
        getRootElement: function () {
            return this.$refs.toastuiEditor;
        },
    },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender_1 = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender_1(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__$1 = script$1;
/* template */
var __vue_render__$1 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "toastuiEditor" });
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = undefined;
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */
/* style inject SSR */
/* style inject shadow dom */
var __vue_component__$1 = /*#__PURE__*/ normalizeComponent({ render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 }, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

//
var script = {
    name: 'ToastuiEditorViewer',
    mixins: [optionsMixin],
    props: {
        height: {
            type: String,
        },
        initialValue: {
            type: String,
        },
        options: {
            type: Object,
        },
    },
    mounted: function () {
        var options = __assign(__assign({}, this.computedOptions), { el: this.$refs.toastuiEditorViewer });
        this.editor = new Viewer(options);
    },
    methods: {
        getRootElement: function () {
            return this.$refs.toastuiEditorViewer;
        },
    },
};

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { ref: "toastuiEditorViewer" });
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */
var __vue_inject_styles__ = undefined;
/* scoped */
var __vue_scope_id__ = undefined;
/* module identifier */
var __vue_module_identifier__ = undefined;
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject */
/* style inject SSR */
/* style inject shadow dom */
var __vue_component__ = /*#__PURE__*/ normalizeComponent({ render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

export { __vue_component__$1 as Editor, __vue_component__ as Viewer };
