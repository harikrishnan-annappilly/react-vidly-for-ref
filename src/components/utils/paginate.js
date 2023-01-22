export default function Paginate(items, pageNumber, pageSize) {
    const itemStartIndex = (pageNumber - 1) * pageSize;
    return items.slice(itemStartIndex, itemStartIndex + pageSize);
}
