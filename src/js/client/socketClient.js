import io from "socket.io-client";


const query = "sessionId=" + window.SESSION_ID;

const socket = io(window.location.host, { query: query });

export default socket;