class SearchParamsUtils {
  private isNumber(slug: unknown): slug is number {
    return !isNaN(slug as number);
  }

  private getSearchParamObj(urlString: string) {
    const url = new URL(urlString);
    return new URLSearchParams(url.search);
  }

  private doesNotSlugExist(searchParam: URLSearchParams) {
    return !searchParam.get("slug")
  }

  addSearchParamToBrowser(urlString: string): void | never {
    const searchParam = this.getSearchParamObj(urlString);

    if (this.doesNotSlugExist(searchParam)) {
      throw Error("there is not slug in href");
    }

    history.pushState(null, "", "?" + searchParam.toString());
  }

  getSlugFromSearchParam(): number | never {
    const searchParam = this.getSearchParamObj(location.href);
    const slug = searchParam.get("slug")!;

    if (!slug) {
      throw Error("slug is not exist");
    }

    if (slug && !this.isNumber(slug)) {
      throw Error("slug is not number or not exist ");
    }

    return +slug;
  }
}

export default SearchParamsUtils;
