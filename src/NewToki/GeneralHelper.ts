import { IconText } from "paperback-extensions-common";

interface ToString {
  toString(): string,
}

type URLParam = {
  key: string,
  value: string
}

export class URLBuilder {
  private params: URLParam[];
  private paths: string[];
  private filterEmptyParamValues: boolean;

  constructor(
    private base: string,
  ) {
    this.params = [];
    this.paths = [];
    this.filterEmptyParamValues = false;
  }

  filterEmptyPramas(): URLBuilder {
    this.filterEmptyParamValues = true;
    return this;
  }

  addPath(path: string): URLBuilder {
    this.paths.push(path);
    return this;
  }

  addParam(key: string, value: ToString | undefined): URLBuilder {
    this.params.push({
      key,
      value: value ? value.toString() : "",
    });
    return this;
  }

  build(): string {
    let url = `${this.base}`;

    if (this.paths.length > 0) {
      url += "/" + this.paths.join("/");
    }

    url = encodeURI(url);

    if (this.params.length > 0) {
      url += "?" + this.params
        .filter((param) =>
          !param.value ||
          !this.filterEmptyParamValues ||
          !param.value)
        .map((param) =>
          encodeURIComponent(param.key) + "=" +
          encodeURIComponent(param.value))
        .join("&");
    }

    return url;
  }
}

// Solely because I'm too lazy to keep writing this every time.
export const createText = (text: string): IconText => createIconText({ text });

