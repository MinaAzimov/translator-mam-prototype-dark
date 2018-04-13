let lastId = 0;

export default function(prefix='notify-toggle-') {
    lastId++;
    return `${prefix}${lastId}`;
}