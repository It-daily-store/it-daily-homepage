export function isValidUrl(url: string): boolean {
  try {
    // Validate URL format
    new URL(url);

    return true;
  } catch (_) {
    // Invalid URL format
    return false;
  }
}

// utils/buildPaginationUrl.ts
/**
 * Generates a new URL with updated page and limit query parameters
 * Preserves all other existing query parameters
 */
export function buildPaginationUrl(
  currentUrl: string | URL,
  newPage: number,
  newLimit?: number,
): string {
  // Handle both string and URL object
  const url = new URL(currentUrl.toString(), 'http://dummy'); // dummy base to make parsing work

  // Update or set page
  url.searchParams.set('page', String(newPage));

  // Update or set limit (only if provided)
  if (newLimit !== undefined) {
    url.searchParams.set('limit', String(newLimit));
  }

  // If you want to REMOVE limit when it's not provided, uncomment this:
  // else {
  //   url.searchParams.delete("limit");
  // }

  // Clean up: remove page/limit if they somehow became empty/invalid
  if (
    url.searchParams.get('page') === 'NaN' ||
    url.searchParams.get('page') === ''
  ) {
    url.searchParams.delete('page');
  }
  if (
    url.searchParams.get('limit') === 'NaN' ||
    url.searchParams.get('limit') === ''
  ) {
    url.searchParams.delete('limit');
  }

  // Return clean path + search (without the dummy origin)
  return url.pathname + url.search;
}
