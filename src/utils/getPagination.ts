export const getPaginationRange = (totalPage: number, currentPage: number) => {
    const totalNumbers = 5; // number of middle pages to show
    const totalBlocks = totalNumbers + 2; // + first & last

    if (totalPage <= totalBlocks) {
        return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    // Always show first page
    pages.push(1);

    let left = Math.max(currentPage - 2, 2);
    let right = Math.min(currentPage + 2, totalPage - 1);

    // Special case: near the start
    if (currentPage <= 4) {
        left = 2;
        right = 6;
    }

    // Special case: near the end
    if (currentPage >= totalPage - 3) {
        left = totalPage - 5;
        right = totalPage - 1;
    }

    // Add left "..."
    if (left > 2) {
        pages.push('...');
    }

    // Add middle pages
    for (let i = left; i <= right; i++) {
        pages.push(i);
    }

    // Add right "..."
    if (right < totalPage - 1) {
        pages.push('...');
    }

    // Always show last page
    pages.push(totalPage);

    return pages;
};