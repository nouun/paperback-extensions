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
exports.ComicK = exports.ComicKInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const ComicKSettings_1 = require("./ComicKSettings");
const ComicKParser_1 = require("./ComicKParser");
const ComicKHelper_1 = require("./ComicKHelper");
const BASE_URL = "https://comick.fun";
const API_BASE_URL = "https://api.comick.fun";
exports.ComicKInfo = {
    name: "ComicK",
    icon: "icon.png",
    websiteBaseURL: BASE_URL,
    version: "0.1.0",
    description: "Extension that scrapes comics from ComicK.fun.",
    author: "Nouun",
    authorWebsite: "https://github.com/nouun/",
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    language: paperback_extensions_common_1.LanguageCode.ENGLISH,
};
class ComicK extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.stateManager = createSourceStateManager({});
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 15000,
        });
        this.getMangaShareUrl = (id) => `${BASE_URL}/comic/${id}`;
    }
    getSourceMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(createSection({
                id: "main",
                header: "ComicK Settings",
                rows: () => Promise.resolve([(0, ComicKSettings_1.menuGeneralSettings)(this.stateManager)]),
            }));
        });
    }
    supportsTagExclusion() {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    // eslint-disable-next-line max-len
    getSearchResults(query, metadata) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const page = (metadata === null || metadata === void 0 ? void 0 : metadata.page) || 1;
            const title = (query.title || "").toString();
            const q = encodeURIComponent(title);
            const inclTags = (_a = query.includedTags) === null || _a === void 0 ? void 0 : _a.map((tag) => tag.id).join(",");
            const exclTags = (_b = query.excludedTags) === null || _b === void 0 ? void 0 : _b.map((tag) => tag.id).join(",");
            const tags = `genres=${inclTags}&excludes=${exclTags}`;
            const req = createRequestObject({
                url: `${API_BASE_URL}/search?tachiyomi=true&q=${q}&page=${page}&${tags}`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const results = (0, ComicKParser_1.parseSearchItems)(data.data);
            return createPagedResults({
                results,
                metadata: { page: page + 1 },
            });
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _req = createRequestObject({
                url: `${API_BASE_URL}/comic/${mangaId}?tachiyomi=true`,
                method: "GET",
            });
            const _data = yield this.requestManager.schedule(_req, 2);
            const _res = JSON.parse(_data.data).comic;
            const req = createRequestObject({
                url: `${API_BASE_URL}/comic/${_res.id}/chapter?tachiyomi=true`,
                method: "GET",
            });
            const res = yield this.requestManager.schedule(req, 2);
            const data = JSON.parse(res.data);
            let allChapters = (0, ComicKParser_1.parseChapters)(mangaId, data.chapters);
            const pages = Math.ceil((data.total - 50) / 50);
            console.log(pages);
            if (pages > 0) {
                const reqs = [...Array(pages).keys()]
                    .map((page) => __awaiter(this, void 0, void 0, function* () {
                    const req = createRequestObject({
                        url: `${API_BASE_URL}/comic/${_res.id}/chapter?tachiyomi=true&page=${page + 1}`,
                        method: "GET",
                    });
                    const res = yield this.requestManager.schedule(req, 2);
                    const data = JSON.parse(res.data);
                    if ((data === null || data === void 0 ? void 0 : data.chapters.length) == 0) {
                        return;
                    }
                    const chapters = (0, ComicKParser_1.parseChapters)(mangaId, data.chapters);
                    allChapters = allChapters.concat(chapters);
                }));
                yield Promise.all(reqs);
            }
            console.log(allChapters.length);
            console.log(data.total);
            const stateData = yield (0, ComicKSettings_1.getStateData)(this.stateManager);
            return allChapters
                .filter((c) => stateData.filter.languages.includes(ComicKHelper_1.CKLanguages.getCKCode(c.langCode)));
        });
    }
    getChapterDetails(mangaId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${API_BASE_URL}/chapter/${id}?tachiyomi=true`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const results = JSON.parse(data.data).chapter;
            const pages = results.images
                .map((item) => item.url);
            return createChapterDetails({
                mangaId,
                id,
                pages,
                longStrip: false,
            });
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${API_BASE_URL}/comic/${mangaId}?tachiyomi=true`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            return (0, ComicKParser_1.parseMangaDetails)(mangaId, data.data);
        });
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${API_BASE_URL}/genre?tachiyomi=true`,
                method: "GET",
            });
            const genreData = yield this.requestManager.schedule(req, 2);
            return (0, ComicKParser_1.parseSearchTags)(genreData.data);
        });
    }
    getHomePageSections(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = [
                createHomeSection({
                    id: "rating",
                    title: "Hot",
                    view_more: true,
                }),
                createHomeSection({
                    id: "view",
                    title: "Trending",
                    view_more: true,
                }),
                createHomeSection({
                    id: "uploaded",
                    title: "New",
                    view_more: true,
                }),
            ];
            const promises = [];
            for (const section of sections) {
                cb(section);
                const req = createRequestObject({
                    url: `${API_BASE_URL}/search?tachiyomi=true&sort=${section.id}&page=1`,
                    method: "GET",
                });
                promises.push(this.requestManager
                    .schedule(req, 2)
                    .then((data) => {
                    section.items = (0, ComicKParser_1.parseSearchItems)(data.data);
                    cb(section);
                }));
            }
            yield Promise.all(promises);
        });
    }
    getViewMoreItems(id, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = (metadata === null || metadata === void 0 ? void 0 : metadata.page) || 1;
            if (metadata === null || metadata === void 0 ? void 0 : metadata.end) {
                return createPagedResults({
                    results: [],
                    metadata,
                });
            }
            const req = createRequestObject({
                url: `${API_BASE_URL}/search?tachiyomi=true&sort=${id}&page=${page}`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 1);
            const results = (0, ComicKParser_1.parseSearchItems)(data.data);
            return createPagedResults({
                results,
                metadata: {
                    page: page + 1,
                    end: (results.length < 50),
                },
            });
        });
    }
}
exports.ComicK = ComicK;

},{"./ComicKHelper":49,"./ComicKParser":50,"./ComicKSettings":51,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKLanguages = void 0;
class _CKLanguages {
    constructor() {
        // As ComicK is just a Mangadex clone, we can use the codes from the Mangadex extension.
        // https://github.com/Paperback-iOS/extensions-sources/blob/primary/src/MangaDex
        this.Languages = [
            {
                // Arabic
                name: "اَلْعَرَبِيَّةُ",
                ckCode: "ar",
                pbCode: "sa",
            },
            {
                // Bulgarian
                name: "български",
                ckCode: "bg",
                pbCode: "bg",
            },
            {
                // Bengali
                name: "বাংলা",
                ckCode: "bn",
                pbCode: "bd",
            },
            {
                // Catalan
                name: "Català",
                ckCode: "ca",
                pbCode: "es",
            },
            {
                // Czech
                name: "Čeština",
                ckCode: "cs",
                pbCode: "cz",
            },
            {
                // Danish
                name: "Dansk",
                ckCode: "da",
                pbCode: "dk",
            },
            {
                // German
                name: "Deutsch",
                ckCode: "de",
                pbCode: "de",
            },
            {
                // English
                name: "English",
                ckCode: "en",
                pbCode: "gb",
                default: true,
            },
            {
                // Spanish
                name: "Español",
                ckCode: "es",
                pbCode: "es",
            },
            {
                // Spanish (Latin American)
                name: "Español (Latinoamérica)",
                ckCode: "es-la",
                pbCode: "es",
            },
            {
                // Farsi
                name: "فارسی",
                ckCode: "fa",
                pbCode: "ir",
            },
            {
                // Finnish
                name: "Suomi",
                ckCode: "fi",
                pbCode: "fi",
            },
            {
                // French
                name: "Français",
                ckCode: "fr",
                pbCode: "fr",
            },
            {
                // Hebrew
                name: "עִבְרִית",
                ckCode: "he",
                pbCode: "il",
            },
            {
                // Hindi
                name: "हिन्दी",
                ckCode: "hi",
                pbCode: "in",
            },
            {
                // Hungarian
                name: "Magyar",
                ckCode: "hu",
                pbCode: "hu",
            },
            {
                // Indonesian
                name: "Indonesia",
                ckCode: "id",
                pbCode: "id",
            },
            {
                // Italian
                name: "Italiano",
                ckCode: "it",
                pbCode: "it",
            },
            {
                // Japanese
                name: "日本語",
                ckCode: "ja",
                pbCode: "jp",
            },
            {
                // Korean
                name: "한국어",
                ckCode: "ko",
                pbCode: "kr",
            },
            {
                // Lithuanian
                name: "Lietuvių",
                ckCode: "lt",
                pbCode: "lt",
            },
            {
                // Mongolian
                name: "монгол",
                ckCode: "mn",
                pbCode: "mn",
            },
            {
                // Malay
                name: "Melayu",
                ckCode: "ms",
                pbCode: "my",
            },
            {
                // Burmese
                name: "မြန်မာဘာသာ",
                ckCode: "my",
                pbCode: "mm",
            },
            {
                // Dutch
                name: "Nederlands",
                ckCode: "nl",
                pbCode: "nl",
            },
            {
                // Norwegian
                name: "Norsk",
                ckCode: "no",
                pbCode: "no",
            },
            {
                // Polish
                name: "Polski",
                ckCode: "pl",
                pbCode: "pl",
            },
            {
                // Portuguese
                name: "Português",
                ckCode: "pt",
                pbCode: "pt",
            },
            {
                // Portuguese (Brazilian)
                name: "Português (Brasil)",
                ckCode: "pt-br",
                pbCode: "pt",
            },
            {
                // Romanian
                name: "Română",
                ckCode: "ro",
                pbCode: "ro",
            },
            {
                // Russian
                name: "Pусский",
                ckCode: "ru",
                pbCode: "ru",
            },
            {
                // Serbian
                name: "Cрпски",
                ckCode: "sr",
                pbCode: "rs",
            },
            {
                // Swedish
                name: "Svenska",
                ckCode: "sv",
                pbCode: "se",
            },
            {
                // Thai
                name: "ไทย",
                ckCode: "th",
                pbCode: "th",
            },
            {
                // Tagalog
                name: "Filipino",
                ckCode: "tl",
                pbCode: "ph",
            },
            {
                // Turkish
                name: "Türkçe",
                ckCode: "tr",
                pbCode: "tr",
            },
            {
                // Ukrainian
                name: "Yкраї́нська",
                ckCode: "uk",
                pbCode: "ua",
            },
            {
                // Vietnamese
                name: "Tiếng Việt",
                ckCode: "vi",
                pbCode: "vn",
            },
            {
                // Chinese (Simplified)
                name: "中文 (简化字)",
                ckCode: "zh",
                pbCode: "cn",
            },
            {
                // Chinese (Traditional)
                name: "中文 (繁體字)",
                ckCode: "zh-hk",
                pbCode: "hk",
            },
        ];
        this.getCKCodeList = () => this.Languages.map((lang) => lang.ckCode);
        this.getName = (ckCode) => {
            var _a, _b;
            return (_b = (_a = this.Languages
                .filter((lang) => lang.ckCode == ckCode)[0]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unknown";
        };
        this.getCKCode = (pbCode) => {
            var _a, _b;
            return (_b = (_a = this.Languages
                .filter((lang) => lang.pbCode == pbCode)[0]) === null || _a === void 0 ? void 0 : _a.ckCode) !== null && _b !== void 0 ? _b : "_unknown";
        };
        this.getPBCode = (ckCode) => {
            var _a, _b;
            return (_b = (_a = this.Languages
                .filter((lang) => lang.ckCode == ckCode)[0]) === null || _a === void 0 ? void 0 : _a.pbCode) !== null && _b !== void 0 ? _b : "_unknown";
        };
        this.getDefault = () => this.Languages
            .filter((lang) => lang.default)
            .map((lang) => lang.ckCode);
    }
}
exports.CKLanguages = new _CKLanguages();

},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSearchItems = exports.parseChapters = exports.parseMangaDetails = exports.parseSearchTags = void 0;
const ComicKHelper_1 = require("./ComicKHelper");
const parseSearchTags = (genre) => {
    const genreTags = JSON.parse(genre)
        .filter((item) => item.slug && item.name)
        .map((item) => createTag({
        id: item.slug,
        label: item.name,
    }));
    return [
        createTagSection({
            id: "genre",
            label: "Genre",
            tags: genreTags,
        }),
    ];
};
exports.parseSearchTags = parseSearchTags;
const parseMangaDetails = (mangaId, data) => {
    const res = JSON.parse(data);
    const c = res.comic;
    const artist = res.artists.map((item) => item.name).join();
    const author = res.authors.map((item) => item.name).join();
    const relatedIds = c.relate_from
        .map((item) => item.relate_to.slug);
    const genres = res.genres
        .map((item) => createTag({
        label: item.name,
        id: item.slug,
    }));
    return createManga({
        id: mangaId,
        titles: [c.title],
        author,
        artist,
        relatedIds,
        desc: c.desc.replaceAll("<br/>", "\n"),
        image: c.cover_url,
        rating: c.bayesian_rating,
        status: c.status,
        follows: c.user_follow_count,
        hentai: c.hentai,
        tags: [
            createTagSection({
                id: "genres",
                label: "Genres",
                tags: genres,
            }),
        ],
    });
};
exports.parseMangaDetails = parseMangaDetails;
const parseChapters = (mangaId, data) => data.map((c) => {
    const id = c.hid;
    const name = c.title || "Unknown";
    const volume = parseInt(c.vol || "") || 1;
    const chapNum = parseInt(c.chap || "1") || 1;
    const time = new Date(c.created_at);
    const langCode = ComicKHelper_1.CKLanguages.getPBCode(c.lang);
    return createChapter({
        id,
        mangaId,
        name,
        volume,
        chapNum,
        time,
        langCode,
    });
});
exports.parseChapters = parseChapters;
const parseSearchItems = (data) => JSON.parse(data)
    .map((item) => {
    let image = "https://comick.fun/static/failed_to_load.png";
    if (item.cover_url) {
        image = item.cover_url;
    }
    else if (item.md_covers && item.md_covers[0]) {
        image = item.md_covers[0].gpurl;
    }
    return createMangaTile({
        id: item.slug,
        image,
        title: createIconText({ text: item.title }),
    });
});
exports.parseSearchItems = parseSearchItems;

},{"./ComicKHelper":49}],51:[function(require,module,exports){
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
const ComicKHelper_1 = require("./ComicKHelper");
const getStateData = (stateManager) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const filterLanguages = (_a = (yield stateManager.retrieve("filterLangs"))) !== null && _a !== void 0 ? _a : ComicKHelper_1.CKLanguages.getDefault();
    return { filter: { languages: filterLanguages } };
});
exports.getStateData = getStateData;
const sectionFilter = (stateManager) => createSection({
    id: "filter_section",
    header: "Filters",
    rows: () => (0, exports.getStateData)(stateManager).then((values) => __awaiter(void 0, void 0, void 0, function* () {
        return [
            createSelect({
                id: "filterLangs",
                label: "Languages",
                options: ComicKHelper_1.CKLanguages.getCKCodeList(),
                displayLabel: (option) => ComicKHelper_1.CKLanguages.getName(option),
                value: values.filter.languages,
                allowsMultiselect: true,
                minimumOptionCount: 1,
            }),
        ];
    })),
});
const formGeneralSettings = (stateManager) => createForm({
    onSubmit: (data) => Promise.all(Object.keys(data).map((key) => stateManager.store(key, data[key]))).then(),
    validate: () => Promise.resolve(true),
    sections: () => Promise.resolve([sectionFilter(stateManager)]),
});
const menuGeneralSettings = (stateManager) => createNavigationButton({
    id: "filter_settings",
    value: "",
    label: "General Settings",
    form: formGeneralSettings(stateManager),
});
exports.menuGeneralSettings = menuGeneralSettings;

},{"./ComicKHelper":49}]},{},[48])(48)
});
