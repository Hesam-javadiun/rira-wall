class SearchParamsUtils {
  private isNumber(slug: unknown): slug is number {
    return !isNaN(slug as number);
  }

  private getSearchParamObj(urlString: string) {
    const url = new URL(urlString);
    return new URLSearchParams(url.search);
  }

  private doesSlugExist(searchParam: URLSearchParams) {
    return searchParam.get("slug")
  }

  addSearchParamToBrowser(urlString: string): void | never {
    const searchParam = this.getSearchParamObj(urlString);

    if (!this.doesSlugExist(searchParam)) {
      throw Error("there is not slug in href");
    }

    history.pushState(null, "", "?" + searchParam.toString());
  }

  getSlugFromSearchParam(): number | never | null {
    const searchParam = this.getSearchParamObj(location.href);
    const slug = searchParam.get("slug")!;
    
    if (!slug) {
      return null
    }

    if (slug && !this.isNumber(slug)) {
      throw Error("slug is not number");
    }

    return +slug;
  }
}

export default SearchParamsUtils;
