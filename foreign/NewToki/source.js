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
            value: value ? value.toString() : "",
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

},{}],49:[function(require,module,exports){
"use strict";
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
exports.NewToki = exports.NewTokiInfo = exports.DEFAULT_NEWTOKI_URL = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const NewTokiSettings_1 = require("./NewTokiSettings");
const NewTokiParser_1 = require("./NewTokiParser");
const GeneralHelper_1 = require("./GeneralHelper");
exports.DEFAULT_NEWTOKI_URL = "https://newtoki111.com";
exports.NewTokiInfo = {
    name: "뉴토끼",
    icon: "icon.png",
    websiteBaseURL: exports.DEFAULT_NEWTOKI_URL,
    version: "0.1.0",
    description: "Extension that scrapes webtoons from 뉴토끼.",
    author: "Nouun",
    authorWebsite: "https://github.com/nouun/",
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    language: paperback_extensions_common_1.LanguageCode.KOREAN,
};
class NewToki extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.NEWTOKI_URL = exports.DEFAULT_NEWTOKI_URL;
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 10000,
            interceptor: new NewTokiInterceptor(() => this.requestManager),
        });
        this.stateManager = createSourceStateManager({});
        this.updateDomain = () => __awaiter(this, void 0, void 0, function* () { return this.NEWTOKI_URL = (yield (0, NewTokiSettings_1.getStateData)(this.stateManager)).domain; });
        this.getBaseURL = () => __awaiter(this, void 0, void 0, function* () { return new GeneralHelper_1.URLBuilder(yield this.updateDomain()); });
        this.getMangaShareUrl = (id) => new GeneralHelper_1.URLBuilder(this.NEWTOKI_URL)
            .addPath("webtoon")
            .addPath(id)
            .build();
    }
    getSourceMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(createSection({
                id: "main",
                header: "뉴토끼 설정",
                rows: () => Promise.resolve([(0, NewTokiSettings_1.menuGeneralSettings)(this.stateManager)]),
            }));
        });
    }
    // eslint-disable-next-line max-len
    getSearchResults(query, metadata) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const page = (metadata === null || metadata === void 0 ? void 0 : metadata.page) || 1;
            const title = query.title || "";
            if (metadata === null || metadata === void 0 ? void 0 : metadata.end) {
                return createPagedResults({ results: [] });
            }
            const url = (yield this.getBaseURL())
                .addPath("webtoon")
                .addParam("stx", title)
                .addParam("tag", (_a = query.includedTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.id).join(","));
            if (page > 1)
                url.addPath(`p${page}`);
            const req = createRequestObject({
                url: url.build(),
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            const [results, end] = (0, NewTokiParser_1.parseSearchResults)(cheerio, this.NEWTOKI_URL);
            return createPagedResults({
                results,
                metadata: {
                    page: page + (end ? 0 : 1),
                    end,
                },
            });
        });
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: (yield this.getBaseURL())
                    .addPath("webtoon")
                    .build(),
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, NewTokiParser_1.parseSearchTags)(cheerio);
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: (yield this.getBaseURL())
                    .addPath("webtoon")
                    .addPath(mangaId)
                    .build(),
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, NewTokiParser_1.parseMangaDetails)(cheerio, mangaId);
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: (yield this.getBaseURL())
                    .addPath("webtoon")
                    .addPath(mangaId)
                    .build(),
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, NewTokiParser_1.parseChapters)(cheerio, mangaId);
        });
    }
    getChapterDetails(mangaId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: (yield this.getBaseURL())
                    .addPath("webtoon")
                    .addPath(id)
                    .build(),
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            return (0, NewTokiParser_1.parseChapterDetails)(data.data, this.cheerio, mangaId, id);
        });
    }
    getHomePageSections(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const sorts = [
                {
                    id: "as_view",
                    name: "인기순",
                },
                {
                    id: "as_good",
                    name: "추천순",
                },
                {
                    id: "as_star",
                    name: "별점순",
                },
                {
                    id: "new",
                    name: "최신",
                },
            ];
            const toonTypes = ["일반웹툰", "성인웹툰", "BL/GL"];
            const stateData = yield (0, NewTokiSettings_1.getStateData)(this.stateManager);
            const sections = toonTypes
                .filter((toonType) => stateData.homeSections.includes(toonType))
                .flatMap((toonType) => sorts
                // eslint-disable-next-line
                .map((sort) => { return { sort, toonType }; }))
                .map(({ sort: { id, name }, toonType }, idx) => createHomeSection({
                id: `${toonType}-${id}`,
                type: idx == 0 ?
                    paperback_extensions_common_1.HomeSectionType.featured :
                    paperback_extensions_common_1.HomeSectionType.singleRowNormal,
                title: `${toonType}: ${name}`,
                view_more: true,
            }));
            const promises = sections.map((section) => __awaiter(this, void 0, void 0, function* () {
                const [toonType, id] = section.id.split("-");
                cb(section);
                const url = (yield this.getBaseURL())
                    .addPath("webtoon")
                    .addParam("toon", toonType)
                    .addParam("sod", "desc");
                if (id != "new") {
                    url.addParam("sst", id);
                }
                const req = createRequestObject({
                    url: url.build(),
                    method: "GET",
                });
                const data = yield this.requestManager.schedule(req, 2);
                const cheerio = this.cheerio.load(data.data);
                const [results] = (0, NewTokiParser_1.parseSearchResults)(cheerio, this.NEWTOKI_URL);
                // if (section.type == HomeSectionType.featured) {
                //   result = result.map((res) => {
                //     res.subtitleText = undefined;
                //     return res;
                //   });
                // }
                section.items = results;
                cb(section);
            }));
            Promise.all(promises);
        });
    }
    getViewMoreItems(ID, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (metadata === null || metadata === void 0 ? void 0 : metadata.end) {
                return createPagedResults({
                    results: [],
                    metadata,
                });
            }
            const page = (metadata === null || metadata === void 0 ? void 0 : metadata.page) || 1;
            const [toonType, id] = ID.split("-");
            const url = (yield this.getBaseURL())
                .addPath("webtoon")
                .addParam("toon", toonType)
                .addParam("sod", "desc");
            if (id != "new")
                url.addParam("sst", id);
            if (page > 1)
                url.addPath(`p${page}`);
            const req = createRequestObject({
                url: url.build(),
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            const [results, end] = (0, NewTokiParser_1.parseSearchResults)(cheerio, this.NEWTOKI_URL);
            return createPagedResults({
                results,
                metadata: {
                    page: page + 1,
                    end,
                },
            });
        });
    }
}
exports.NewToki = NewToki;
class NewTokiInterceptor {
    // constructor(
    //   private requestManager: () => RequestManager,
    // ) {}
    interceptRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return req;
        });
    }
    interceptResponse(res) {
        return __awaiter(this, void 0, void 0, function* () {
            // FIXME: Figure out why this isn't working.
            // If .jpg returns 404, try .jpeg.
            // const url = res.request.url;
            // if (url.includes("jpg") && res.status == 404) {
            //   const req = res.request;
            //   req.url = url.replaceAll("jpg", "jpeg");
            //   res = await this.requestManager().schedule(req, 2);
            // }
            return res;
        });
    }
}

},{"./GeneralHelper":48,"./NewTokiParser":50,"./NewTokiSettings":51,"paperback-extensions-common":5}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChapterDetails = exports.parseChapters = exports.parseMangaDetails = exports.parseSearchTags = exports.parseSearchResults = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const GeneralHelper_1 = require("./GeneralHelper");
const parseTime = (timeString) => {
    if (timeString.includes(":")) {
        const [year, month, day] = new Date()
            .toLocaleDateString("en-US", { timeZone: "Asia/Seoul" })
            .split("/")
            .map((part) => part.padStart(2));
        return new Date([month, day, year].join("-") + "T" + timeString + ":00+09:00");
    }
    else {
        return new Date(timeString.replace(/\./g, "-") + "T00:00:00+09:00");
    }
};
const parseSearchResults = ($, baseDomain) => {
    const results = $("#webtoon-list-all > li > div > div > .imgframe")
        .toArray()
        .map((tile) => {
        const id = $(".img-item > a", tile)
            .attr("href")
            .match(/webtoon\/(\d+)/)[1];
        if (!id)
            throw Error("Unable to match search result ID");
        let image = $(".img-item > a > img", tile).attr("src");
        const imageParts = image
            .match(/\.[a-zA-Z]*\/(.*)\/thumb-([^.]*)_\d+x\d+\.jpe?g/);
        if (imageParts) {
            image = new GeneralHelper_1.URLBuilder(baseDomain)
                .addPath(imageParts[1])
                .addPath(imageParts[2] + ".jpg")
                .build();
        }
        const title = (0, GeneralHelper_1.createText)($(".title", tile).text());
        const subtitleText = (0, GeneralHelper_1.createText)($(".list-date", tile).text());
        return createMangaTile({
            id,
            image,
            title,
            subtitleText,
        });
    });
    const end = $(".disabled > a > .fa-angle-double-right")
        .toArray()
        .length != 0;
    return [
        results,
        end,
    ];
};
exports.parseSearchResults = parseSearchResults;
const parseSearchTags = ($) => {
    const genres = $(".s-genre")
        .toArray()
        .map((el) => $(el).attr("data-value"))
        .filter((tag) => !!tag)
        .map((tag) => createTag({
        id: tag,
        label: tag,
    }));
    return [
        createTagSection({
            id: "tag",
            label: "장르",
            tags: genres,
        }),
    ];
};
exports.parseSearchTags = parseSearchTags;
const parseMangaDetails = ($, id) => {
    const el = $(".view-title > .view-content > .row");
    const image = $("div > .view-content1 > .view-img > img", el).attr("src");
    const titles = [
        $("div > .view-content > span > b", el).text()
            .trim(),
    ];
    const descEl = $("div > .view-content", el).get(1);
    const desc = $(descEl)
        .text()
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
        const id = linkEl
            .attr("href")
            .match(/webtoon\/(\d+)/)[1];
        if (!id)
            throw Error("Unable to match search result ID");
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
            .trim();
        const time = parseTime(timeStr);
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
    var _a;
    let pages = [];
    try {
        const htmlRegex = /var( *html_data *\+?= *'([A-Z0-9]{2}\.)*';? *\n?)+/;
        const scriptRegex = /unescape\('(%[A-Z0-9]{2})+'\)/;
        // @ts-ignore
        const htmlDataScript = data.match(htmlRegex)[0];
        // @ts-ignore
        const htmlData = eval(htmlDataScript);
        // @ts-ignore
        let script = data.match(scriptRegex)[0];
        console.log("Original Script: " + script);
        // @ts-ignore
        script = eval(script);
        // @ts-ignore
        script = script.substr(0, script.lastIndexOf("<"));
        script = script.substr(script.lastIndexOf(">") + 1);
        script = script.replace(/document\..*=/, "return ");
        script = script.replace(/document\..*\((.*)\)/, "return $1");
        const funcName = ((_a = script.match(/function +(.*?)\(/)) !== null && _a !== void 0 ? _a : [0, "html_encoder"])[1];
        console.log("parsed: " + script);
        const out = eval("var l;" + script + `${funcName}(htmlData)`);
        console.log("Output: " + out);
        const $ = cheerio.load(out);
        pages = $("div > img")
            .toArray()
            .map((page) => $(page).get(0).attribs)
            .map((attribs) => {
            var _a;
            return attribs[(_a = Object.keys(attribs).filter((attrib) => attrib.startsWith("data-"))[0]) !== null && _a !== void 0 ? _a : "data"];
        });
    }
    catch (_b) {
        throw Error("Unable to evaluate server chapter code.");
    }
    return createChapterDetails({
        mangaId,
        id,
        pages,
        longStrip: false,
    });
};
exports.parseChapterDetails = parseChapterDetails;

},{"./GeneralHelper":48,"paperback-extensions-common":5}],51:[function(require,module,exports){
"use strict";
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
exports.menuGeneralSettings = exports.getStateData = void 0;
class HomeSection {
}
HomeSection.IDs = [
    {
        id: "일반웹툰",
        default: true,
    },
    {
        id: "성인웹툰",
        default: false,
    },
    {
        id: "BL/GL",
        default: false,
    },
];
HomeSection.getIDs = () => HomeSection.IDs.map((id) => id.id);
HomeSection.getDefaults = () => HomeSection.IDs.filter((id) => id.default);
const getStateData = (stateManager) => __awaiter(void 0, void 0, void 0, function* () {
    const domain = (yield stateManager.retrieve("domain"))
        || "https://newtoki111.com";
    const homeSections = (yield stateManager.retrieve("homeSections"))
        || HomeSection.getDefaults();
    return {
        domain,
        homeSections,
    };
});
exports.getStateData = getStateData;
const sectionGeneral = (stateManager) => createSection({
    id: "section_general",
    rows: () => (0, exports.getStateData)(stateManager).then((values) => __awaiter(void 0, void 0, void 0, function* () {
        return [
            createSelect({
                id: "homeSections",
                label: "활성 홈 섹션",
                options: HomeSection.getIDs(),
                displayLabel: (id) => id,
                value: values.homeSections,
                allowsMultiselect: true,
            }),
            createInputField({
                id: "domain",
                label: "도메인",
                value: values.domain,
                maskInput: false,
                placeholder: "",
            }),
        ];
    })),
});
const formGeneralSettings = (stateManager) => createForm({
    onSubmit: (data) => Promise.all(Object.keys(data).map((key) => stateManager.store(key, data[key]))).then(),
    validate: () => Promise.resolve(true),
    sections: () => Promise.resolve([sectionGeneral(stateManager)]),
});
const menuGeneralSettings = (stateManager) => createNavigationButton({
    id: "btn_settings_general",
    value: "",
    label: "설정",
    form: formGeneralSettings(stateManager),
});
exports.menuGeneralSettings = menuGeneralSettings;

},{}]},{},[49])(49)
});
