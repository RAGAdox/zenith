import { QueryParams } from "../routes";

function parseQueryString(queryString: string): QueryParams {
  const params = new URLSearchParams(queryString);
  const query: QueryParams = {};
  params.forEach((value, key) => {
    if (query[key]) {
      query[key] = Array.isArray(query[key])
        ? [...(query[key] as string[]), value]
        : [query[key], value];
    } else {
      query[key] = value;
    }
  });
  return query;
}

export default parseQueryString;
