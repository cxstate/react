(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('@cxstate/cxstate')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', '@cxstate/cxstate'], factory) :
    (factory((global.react = {}),global.react,global.cxstate));
}(this, (function (exports,react,cxstate) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function useMachine(machineDef) {
        var service = react.useState(function () { return cxstate.interpret(machineDef); })[0];
        var _a = react.useState({
            path: service.path(),
            context: service.context(),
        }), state = _a[0], setState = _a[1];
        react.useEffect(function () { return service.onTransition(function (context, path) {
            setState({ context: context, path: path });
        }); }, [service, setState]);
        return [
            __assign(__assign({}, state), { matchesOne: service.matchesOne, matchesNone: service.matchesNone }),
            service.send,
        ];
    }

    exports.useMachine = useMachine;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=react.umd.js.map
