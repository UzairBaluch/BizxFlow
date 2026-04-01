const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

function firstQueryValue(raw) {
  if (raw == null) return undefined;
  return Array.isArray(raw) ? raw[0] : raw;
}

function parseQueryInt(raw) {
  const v = firstQueryValue(raw);
  if (v === undefined || v === null || v === "") return NaN;
  return Number.parseInt(String(v), 10);
}

function parsePagination(query) {
  const pageParsed = parseQueryInt(query?.page);
  const page =
    Number.isFinite(pageParsed) && pageParsed >= 1
      ? pageParsed
      : DEFAULT_PAGE;

  const limitParsed = parseQueryInt(query?.limit);
  const limit = Number.isFinite(limitParsed)
    ? Math.min(Math.max(limitParsed, 1), MAX_LIMIT)
    : DEFAULT_LIMIT;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

export { parsePagination, DEFAULT_LIMIT, MAX_LIMIT };
