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
exports.Zahard = exports.ZahardInfo = exports.BASE_URL = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const ZahardParser_1 = require("./ZahardParser");
exports.BASE_URL = "https://zahard.top";
exports.ZahardInfo = {
    name: "Zahard",
    icon: "icon.png",
    websiteBaseURL: exports.BASE_URL,
    version: "0.1.0",
    description: "Extension that scrapes manwha and webtoons from Zahard.top.",
    author: "Nouun",
    authorWebsite: "https://github.com/nouun/",
    contentRating: paperback_extensions_common_1.ContentRating.ADULT,
    language: paperback_extensions_common_1.LanguageCode.ENGLISH,
};
class Zahard extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 4,
            requestTimeout: 15000,
        });
        this.getMangaShareUrl = (id) => `${exports.BASE_URL}/manga/${id}`;
    }
    // eslint-disable-next-line max-len
    getSearchResults(query, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.title) {
                return this.getSearchTitleResults(query.title);
            }
            else if (query.includedTags && query.includedTags[0]) {
                return this.getSearchTagResults(query.includedTags[0], metadata);
            }
            else {
                return createPagedResults({ results: [] });
            }
        });
    }
    getSearchTitleResults(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${exports.BASE_URL}/search?query=${encodeURIComponent(title)}`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const results = JSON.parse(data.data)
                .suggestions
                .map((item) => {
                return createMangaTile({
                    id: item.data,
                    image: (0, ZahardParser_1.getImage)(item.data),
                    title: createIconText({ text: item.value }),
                });
            });
            return createPagedResults({ results });
        });
    }
    getSearchTagResults(tag, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = (metadata === null || metadata === void 0 ? void 0 : metadata.page) || 1;
            const req = createRequestObject({
                url: `${exports.BASE_URL}/filterList?page=${page}&cat=${tag.id}&sortBy=name&asc=true`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            const results = (0, ZahardParser_1.parseFilterSearch)(cheerio);
            return createPagedResults({ results });
        });
    }
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${exports.BASE_URL}/manga/${mangaId}`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, ZahardParser_1.parseChapters)(cheerio, mangaId);
        });
    }
    getChapterDetails(mangaId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${exports.BASE_URL}/manga/${mangaId}/${id}`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, ZahardParser_1.parseChapterDetails)(cheerio, mangaId, id);
        });
    }
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${exports.BASE_URL}/manga/${mangaId}`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, ZahardParser_1.parseMangaDetails)(cheerio, mangaId);
        });
    }
    getSearchTags() {
        return __awaiter(this, void 0, void 0, function* () {
            const req = createRequestObject({
                url: `${exports.BASE_URL}/manga-list`,
                method: "GET",
            });
            const data = yield this.requestManager.schedule(req, 2);
            const cheerio = this.cheerio.load(data.data);
            return (0, ZahardParser_1.parseSearchTags)(cheerio);
        });
    }
    getHomePageSections(cb) {
        return __awaiter(this, void 0, void 0, function* () {
            const sections = [
                {
                    req: createRequestObject({
                        url: exports.BASE_URL,
                        method: "GET",
                    }),
                    section: createHomeSection({
                        id: "updated",
                        title: "Recently Updated",
                        view_more: true,
                    }),
                }, {
                    req: createRequestObject({
                        url: `${exports.BASE_URL}/filterList?page=1&sortBy=views&asc=false`,
                        method: "GET",
                    }),
                    section: createHomeSection({
                        id: "viewed",
                        title: "Most Viewed",
                        view_more: true,
                    }),
                },
            ];
            const promises = [];
            for (const section of sections) {
                cb(section.section);
                promises.push(this.requestManager.schedule(section.req, 2).then((res) => {
                    const $ = this.cheerio.load(res.data);
                    switch (section.section.id) {
                        case "updated":
                            section.section.items = (0, ZahardParser_1.parseUpdatedItems)($, true);
                            break;
                        case "viewed":
                            section.section.items = (0, ZahardParser_1.parseFilterSearch)($);
                            break;
                        default: return;
                    }
                    cb(section.section);
                }));
            }
            yield Promise.all(promises);
        });
    }
    getViewMoreItems(id, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = (metadata === null || metadata === void 0 ? void 0 : metadata.page) || 1;
            let results;
            switch (id) {
                case "updated": {
                    if (page != 1)
                        return createPagedResults({ results: [] });
                    const req = createRequestObject({
                        url: exports.BASE_URL,
                        method: "GET",
                    });
                    const data = yield this.requestManager.schedule(req, 1);
                    const $ = this.cheerio.load(data.data);
                    results = (0, ZahardParser_1.parseUpdatedItems)($, false);
                    break;
                }
                case "viewed": {
                    const req = createRequestObject({
                        url: `${exports.BASE_URL}/filterList?page=${page}&sortBy=views&asc=false`,
                        method: "GET",
                    });
                    const data = yield this.requestManager.schedule(req, 1);
                    const $ = this.cheerio.load(data.data);
                    results = (0, ZahardParser_1.parseFilterSearch)($);
                    break;
                }
                default:
                    return Promise.resolve(createPagedResults({ results: [] }));
            }
            return createPagedResults({
                results,
                metadata: { page: page + 1 },
            });
        });
    }
}
exports.Zahard = Zahard;

},{"./ZahardParser":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImage = exports.parseFilterSearch = exports.parseUpdatedItems = exports.parseChapters = exports.parseChapterDetails = exports.parseMangaDetails = exports.parseSearchTags = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const Zahard_1 = require("./Zahard");
const parseSearchTags = ($) => {
    const tags = $(".list-category > li > a")
        .toArray()
        .map((el) => {
        const idParts = $(el).attr("href")
            .split("=");
        const id = idParts[idParts.length - 1];
        const label = $(el).text();
        return createTag({
            id,
            label,
        });
    })
        .filter((tag) => (tag.id && tag.label));
    const categories = createTagSection({
        id: "0",
        label: "genres",
        tags: tags,
    });
    return [categories];
};
exports.parseSearchTags = parseSearchTags;
const parseMangaDetails = ($, mangaId) => {
    const title = $(".col-sm-12 > .widget-title").text();
    const desc = $(".well > p").text();
    const rating = parseFloat($("#item-rating").attr("data-score")) || 0.0;
    const tags = $("dl > dd > a")
        .toArray()
        .map((el) => {
        const idParts = $(el).attr("href");
        const id = idParts[idParts.length - 1];
        return createTag({
            label: $(el).text(),
            id,
        });
    });
    let status;
    switch ($("dl > dd > span").text()) {
        case "Ongoing":
            status = paperback_extensions_common_1.MangaStatus.ONGOING;
            break;
        default:
            // TODO: Find other status and remove this.
            console.log(`UNKNOWN STATUS: ${$("dl > dd > span").text()}`);
            status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
    }
    return createManga({
        id: mangaId,
        titles: [title],
        image: (0, exports.getImage)(mangaId),
        author: "Unknown",
        artist: "Unknown",
        desc,
        rating,
        status,
        tags: [
            createTagSection({
                id: "cats",
                label: "Categories",
                tags,
            }),
        ],
    });
};
exports.parseMangaDetails = parseMangaDetails;
const parseChapterDetails = ($, mangaId, id) => {
    const pages = $("#all > img")
        .toArray()
        .map((el) => $(el).attr("data-src")
        .trim())
        .filter((img) => !!img);
    return createChapterDetails({
        id,
        mangaId,
        pages,
        longStrip: false,
    });
};
exports.parseChapterDetails = parseChapterDetails;
const parseChapters = ($, mangaId) => $(".chapters > li")
    .toArray()
    .map((el) => {
    const linkEl = $("h5 > a", el);
    const idParts = linkEl.attr("href").split("/");
    const id = idParts[idParts.length - 1];
    const volume = $(el).attr("class")
        .split("-")[1];
    const chapNum = Number(id) || 0;
    const name = $("h5 > em", el).text() || `Chapter ${chapNum}`;
    const dateStr = $("div > div", el).text();
    const time = new Date(Date.parse(dateStr)) || new Date();
    return createChapter({
        id,
        mangaId,
        name,
        volume,
        chapNum,
        time,
        langCode: paperback_extensions_common_1.LanguageCode.ENGLISH,
    });
})
    .reverse();
exports.parseChapters = parseChapters;
const parseUpdatedItems = ($, truncate) => $(".hot-thumbnails > li > div").toArray()
    .map((el) => {
    const titleEl = $(".manga-name > a", el);
    const title = createIconText({ text: titleEl.text() });
    const idParts = titleEl.attr("href").split("/");
    const id = idParts[idParts.length - 1];
    const image = $("a > img", el).attr("src");
    return createMangaTile({
        title,
        id,
        image,
    });
})
    .filter((_, index) => (!truncate || (index < 12)));
exports.parseUpdatedItems = parseUpdatedItems;
const parseFilterSearch = ($) => $(".col-sm-6 > .media")
    .toArray()
    .map((el) => {
    const headerEl = $(".media-body > .media-heading > a", el);
    const idParts = headerEl.attr("href").split("/");
    const id = idParts[idParts.length - 1];
    const title = createIconText({ text: headerEl.text() });
    const image = $(".media-left > a > img", el).attr("src");
    const rating = parseFloat($(".media-body > span", el).text()) || 0.0;
    return createMangaTile({
        id,
        title,
        image,
        subtitleText: createIconText({ text: rating.toFixed(2) }),
    });
});
exports.parseFilterSearch = parseFilterSearch;
const getImage = (id) => `${Zahard_1.BASE_URL}/uploads/manga/${id}/cover/cover_250x350.jpg`;
exports.getImage = getImage;

},{"./Zahard":48,"paperback-extensions-common":5}]},{},[48])(48)
});
