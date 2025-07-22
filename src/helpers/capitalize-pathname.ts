function capitalizePathname(input: string): string {
  const segments = input.split('/').filter(Boolean); // removes empty parts
  const lastSegment = segments[segments.length - 1];

  if (!lastSegment) return '';

  return lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default capitalizePathname;

