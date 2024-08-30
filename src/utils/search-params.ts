class SearchParamsUtils {
  private isNumber(slug: unknown): slug is number {
    return !isNaN(slug as number);
  }

  private getSearchParamObj(urlString: string) {
    const url = new URL(urlString);
    return new URLSearchParams(url.search);
  }

  private doesSlugExist(searchParam: URLSearchParams) {
    return searchParam.get("slug");
  }

  addSearchParamToBrowserURL(slug?: number): void | never {
    const searchParam = this.getSearchParamObj(location.href);

    if (this.doesSlugExist(searchParam)) {
      return 
    }

    searchParam.set("slug", "" + (slug ?? null));
    history.replaceState(null, "", "?" + searchParam.toString());
  }

  getSlugFromSearchParam(): number | never | null {
    const searchParam = this.getSearchParamObj(location.href);
    const slug = searchParam.get("slug")!;
    if (slug === 'null') {
      return null;
    }
    
    if (slug && !this.isNumber(slug)) {
      throw Error("slug is not number");
    }

    return +slug;
  }

  navigateBack(){
    history.replaceState(null, "", './');
  }
}

export default SearchParamsUtils;
