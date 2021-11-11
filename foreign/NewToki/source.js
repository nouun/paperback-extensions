(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
var indexOf = function (xs, item) {
    if (xs.indexOf) return xs.indexOf(item);
    else for (var i = 0; i < xs.length; i++) {
        if (xs[i] === item) return i;
    }
    return -1;
};
var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    if (context) {
        forEach(Object_keys(ctx), function (key) {
            context[key] = ctx[key];
        });
    }

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.isContext = function (context) {
    return context instanceof Context;
};

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};

},{}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createText = exports.URLBuilder = void 0;
class URLBuilder {
    constructor(base) {
        this.base = base;
        this.params = [];
        this.paths = [];
        this.filterEmptyParamValues = false;
    }
    filterEmptyPramas() {
        this.filterEmptyParamValues = true;
        return this;
    }
    addPath(path) {
        this.paths.push(path);
        return this;
    }
    addParam(key, value) {
        this.params.push({
            key,
            value: value.toString(),
        });
        return this;
    }
    build() {
        let url = `${this.base}`;
        if (this.paths.length > 0) {
            url += "/" + this.paths.join("/");
        }
        url = encodeURI(url);
        if (this.params.length > 0) {
            url += "?" + this.params
                .filter((param) => !param.value ||
                !this.filterEmptyParamValues ||
                !param.value)
                .map((param) => encodeURIComponent(param.key) + "=" +
                encodeURIComponent(param.value))
                .join("&");
        }
        return url;
    }
}
exports.URLBuilder = URLBuilder;
// Solely because I'm too lazy to keep writing this every time.
const createText = (text) => createIconText({ text });
exports.createText = createText;

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewToki = exports.NewTokiInfo = exports.DEFAULT_NEWTOKI_URL = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const NewTokiSettings_1 = require("./NewTokiSettings");
const GeneralHelper_1 = require("./GeneralHelper");
const NewTokiParser_1 = require("./NewTokiParser");
exports.DEFAULT_NEWTOKI_URL = "https://newtoki111.com";
exports.NewTokiInfo = {
    name: "뉴토끼",
    icon: "icon.png",
    websiteBaseURL: exports.DEFAULT_NEWTOKI_URL,
    version: "0.1.0",
    description: "Extension that scrapes webtoons from 뉴토끼.",
    author: "Nouun",
    authorWebsite: "https://github.com/nouun/",
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    language: paperback_extensions_common_1.LanguageCode.KOREAN,
};
class NewToki extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.NEWTOKI_URL = exports.DEFAULT_NEWTOKI_URL;
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 15000,
        });
        this.stateManager = createSourceStateManager({});
        this.updateDomain = async () => this.NEWTOKI_URL = (await (0, NewTokiSettings_1.getStateData)(this.stateManager)).domain;
        this.getBaseURL = async () => new GeneralHelper_1.URLBuilder(await this.updateDomain());
        this.getMangaShareUrl = (id) => new GeneralHelper_1.URLBuilder(this.NEWTOKI_URL)
            .addPath("webtoon")
            .addPath(id)
            .build();
        // override async getSearchTags(): Promise<TagSection[]> {
        //   const req = createRequestObject({
        //     url: `${BASE_URL}/manga-list`,
        //     method: "GET",
        //   });
        //   const data = await this.requestManager.schedule(req, 2);
        //   const cheerio = this.cheerio.load(data.data);
        //   return parseSearchTags(cheerio);
        // }
        //     override async getHomePageSections(cb: (section: HomeSection) => void): Promise<void> {
        //       const req = createRequestObject({
        //         url: `${API_BASE_URL}?${PARAMS}`,
        //         method: "GET",
        //       });
        //       const data = await this.requestManager.schedule(req, 2);
        //       const details = JSON.parse(data.data).data;
        //       parseHomePageSections(details, cb);
        //     }
        //     override async getViewMoreItems(id: string, metadata: Metadata): Promise<PagedResults> {
        //       const page = metadata?.page || 1;
        //       let results: MangaTile[];
        //       switch (id) {
        //         case "updated": {
        //           if (page != 1)
        //             return createPagedResults({ results: [] });
        //           const req = createRequestObject({
        //             url: BASE_URL,
        //             method: "GET",
        //           });
        //           const data = await this.requestManager.schedule(req, 2);
        //           const $ = this.cheerio.load(data.data);
        //           results = parseUpdatedItems($, false);
        //           break;
        //         }
        //         case "viewed": {
        //           const req = createRequestObject({
        //             url: `${BASE_URL}/filterList?page=${page}&sortBy=views&asc=false`,
        //             method: "GET",
        //           });
        //           const data = await this.requestManager.schedule(req, 2);
        //           const $ = this.cheerio.load(data.data);
        //           results = parseFilterSearch($);
        //           break;
        //         }
        //         default:
        //           return Promise.resolve(createPagedResults({ results: [] }));
        //       }
        //     return createPagedResults({
        //       results,
        //       metadata: { page: page + 1 },
        //     });
        //   }
    }
    async getSourceMenu() {
        return Promise.resolve(createSection({
            id: "main",
            header: "뉴토끼 설정",
            rows: () => Promise.resolve([(0, NewTokiSettings_1.menuGeneralSettings)(this.stateManager)]),
        }));
    }
    // eslint-disable-next-line max-len
    async getSearchResults(query, metadata) {
        const title = query.title || "";
        if (title.split("").length < 2 || metadata?.end) {
            return createPagedResults({ results: [] });
        }
        const req = createRequestObject({
            url: (await this.getBaseURL())
                .addPath("webtoon")
                .addParam("stx", title)
                .build(),
            method: "GET",
        });
        const data = await this.requestManager.schedule(req, 2);
        const cheerio = this.cheerio.load(data.data);
        const results = (0, NewTokiParser_1.parseSearchResults)(cheerio);
        return createPagedResults({
            results,
            metadata: { end: true },
        });
    }
    async getSearchTagResults(tag, metadata) {
        const page = metadata?.page || 1;
        const req = createRequestObject({
            url: `${BASE_URL}/filterList?page=${page}&cat=${tag.id}&sortBy=name&asc=true`,
            method: "GET",
        });
        const data = await this.requestManager.schedule(req, 2);
        const cheerio = this.cheerio.load(data.data);
        const results = parseFilterSearch(cheerio);
        return createPagedResults({ results });
    }
    async getMangaDetails(mangaId) {
        const req = createRequestObject({
            url: (await this.getBaseURL())
                .addPath("webtoon")
                .addPath(mangaId)
                .build(),
            method: "GET",
        });
        const data = await this.requestManager.schedule(req, 2);
        const cheerio = this.cheerio.load(data.data);
        return (0, NewTokiParser_1.parseMangaDetails)(cheerio, mangaId);
    }
    async getChapters(mangaId) {
        const req = createRequestObject({
            url: (await this.getBaseURL())
                .addPath("webtoon")
                .addPath(mangaId)
                .build(),
            method: "GET",
        });
        const data = await this.requestManager.schedule(req, 2);
        const cheerio = this.cheerio.load(data.data);
        return (0, NewTokiParser_1.parseChapters)(cheerio, mangaId);
    }
    async getChapterDetails(mangaId, id) {
        const req = createRequestObject({
            url: (await this.getBaseURL())
                .addPath("webtoon")
                .addPath(id)
                .build(),
            method: "GET",
        });
        const data = await this.requestManager.schedule(req, 2);
        return (0, NewTokiParser_1.parseChapterDetails)(data.data, this.cheerio, mangaId, id);
    }
}
exports.NewToki = NewToki;

},{"./GeneralHelper":49,"./NewTokiParser":51,"./NewTokiSettings":52,"paperback-extensions-common":5}],51:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChapterDetails = exports.parseChapters = exports.parseMangaDetails = exports.parseSearchResults = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const GeneralHelper_1 = require("./GeneralHelper");
const vm_1 = __importDefault(require("vm"));
const parseSearchResults = ($) => {
    const results = $("#webtoon-list-all > li > div > div > .imgframe").toArray();
    return results.map((tile) => {
        let id = $(".img-item > a", tile).attr("href");
        id = id.substr(0, id.lastIndexOf("/"));
        id = id.substr(id.lastIndexOf("/") + 1);
        const image = $(".img-item > a > img", tile).attr("src")
            .replaceAll("thumb-", "")
            .replaceAll("_174x124", "");
        const title = (0, GeneralHelper_1.createText)($(".title", tile).text());
        const subtitleText = (0, GeneralHelper_1.createText)($(".list-date", tile).text());
        return createMangaTile({
            id,
            image,
            title,
            subtitleText,
        });
    });
};
exports.parseSearchResults = parseSearchResults;
const parseMangaDetails = ($, id) => {
    const el = $(".view-title > .view-content > .row");
    const image = $("div > .view-content1 > .view-img > img", el).attr("src");
    const titles = [
        $("div > .view-content > span > b", el).text()
            .trim(),
    ];
    const descEl = $("div > .view-content", el).get(1);
    const desc = $(descEl).text()
        .trim();
    return createManga({
        id,
        image,
        titles,
        desc,
        status: paperback_extensions_common_1.MangaStatus.UNKNOWN,
    });
};
exports.parseMangaDetails = parseMangaDetails;
const parseChapters = ($, mangaId) => {
    const chapters = $("#serial-move > .serial-list > .list-body > .list-item").toArray();
    return chapters.map((chapter) => {
        const linkEl = $(".wr-subject > .item-subject", chapter);
        let id = linkEl.attr("href");
        id = id.substr(0, id.lastIndexOf("/"));
        id = id.substr(id.lastIndexOf("/") + 1);
        const name = linkEl
            .contents()
            .filter(function () {
            return this.nodeType === 3;
        })
            .text()
            .trim();
        const chapNum = parseFloat($(".wr-num", chapter).text()) || 1;
        const timeStr = $(".wr-date", chapter)
            .text()
            .replaceAll(".", "-");
        const time = new Date(timeStr);
        return createChapter({
            id,
            mangaId,
            name,
            chapNum,
            time,
            langCode: paperback_extensions_common_1.LanguageCode.KOREAN,
        });
    });
};
exports.parseChapters = parseChapters;
const parseChapterDetails = (data, cheerio, mangaId, id) => {
    const pages = [];
    //try {
    const t = vm_1.default.runInNewContext("1 + 1");
    throw Error(t);
    return createChapterDetails({
        mangaId,
        id,
        pages,
        longStrip: false,
    });
};
exports.parseChapterDetails = parseChapterDetails;

},{"./GeneralHelper":49,"paperback-extensions-common":5,"vm":48}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuGeneralSettings = exports.getStateData = void 0;
const getStateData = async (stateManager) => {
    const domain = await stateManager.retrieve("domain")
        || "https://newtoki111.com";
    return { domain };
};
exports.getStateData = getStateData;
const sectionGeneral = (stateManager) => createSection({
    id: "section_general",
    rows: () => (0, exports.getStateData)(stateManager).then(async (values) => [
        createInputField({
            id: "domain",
            label: "도메인",
            value: values.domain,
            maskInput: false,
            placeholder: "",
        }),
    ]),
});
const formGeneralSettings = (stateManager) => createForm({
    onSubmit: (data) => Promise.all(Object.keys(data).map((key) => stateManager.store(key, data[key]))).then(),
    validate: () => Promise.resolve(true),
    sections: () => Promise.resolve([sectionGeneral(stateManager)]),
});
const menuGeneralSettings = (stateManager) => createNavigationButton({
    id: "btn_settings_general",
    value: "",
    label: "General 설정",
    form: formGeneralSettings(stateManager),
});
exports.menuGeneralSettings = menuGeneralSettings;

},{}]},{},[50])(50)
});
