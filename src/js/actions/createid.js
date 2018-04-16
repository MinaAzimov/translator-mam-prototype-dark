export default function(prefix='notify-toggle-') {
	let lastId;
    lastId++;
    return `${prefix}${lastId}`;
}