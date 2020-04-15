"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var cxstate_1 = require("@cxstate/cxstate");
function useMachine(machineDef) {
    var service = react_1.useState(function () { return cxstate_1.interpret(machineDef); })[0];
    var _a = react_1.useState({
        path: service.path(),
        context: service.context()
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        return service.onTransition(function (context, path) {
            setState({ context: context, path: path });
        });
    }, [service, setState]);
    return [
        __assign(__assign({}, state), { matchesOne: service.matchesOne, matchesNone: service.matchesNone }),
        service.send
    ];
}
exports.useMachine = useMachine;
/**
 * TContextIntersection is expected to be an intersection type of all contexts: ...&...
 **/
function useMachines() {
    var machineDefs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        machineDefs[_i] = arguments[_i];
    }
    var parallelService = react_1.useState(function () {
        return cxstate_1.parallelize.apply(void 0, machineDefs.map(cxstate_1.interpret));
    })[0];
    var _a = react_1.useState({
        paths: parallelService.paths(),
        context: parallelService.context()
    }), state = _a[0], setState = _a[1];
    react_1.useEffect(function () {
        return parallelService.onTransition(function (context, paths) {
            setState({ context: context, paths: paths });
        });
    }, [parallelService, setState]);
    return [
        __assign(__assign({}, state), { matchesOne: parallelService.matchesOne, matchesNone: parallelService.matchesNone }),
        parallelService.send
    ];
}
exports.useMachines = useMachines;
//# sourceMappingURL=react.js.map