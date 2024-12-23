function parsePathWithoutQuery(url: string): string {
  return url.split("?")[0].split("#")[0];
}

export default parsePathWithoutQuery;
