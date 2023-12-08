import axios from "axios";

/**
 * Rota para o recurso de evento
*/
export const eventsResource = "/Evento";

/**
 * Rota para o recurso Login
 */
export const loginResource = '/Login';

/**
 * Rota para o recurso de proximos eventos
*/
export const nextEventResource = "/Evento/ListarProximos";

/**
 * Rota para o recurso Listar minhas
 */
export const MyEventsResource = '/PresencaEvento/ListarMinhas'

/**
 * Rota para o recurso Listar Presencas Evento
 */
export const precencesEventResource = '/PresencaEvento'

/**
 * Rota para o recurso Buscar comentario sobre Evento
 */
export const myComentary = `/ComentariosEvento/BuscarPorIdUsuario`

/**
 * Rota para o recurso Buscar comentario sobre Evento
 */
export const Comentaries = `/ComentariosEvento`

/**
 * Rota para o recurso de tipos de eventos
*/
export const eventTypeResource = "/TiposEvento";

const apiPort = '7118';
const localApiUrl = `https://localhost:${apiPort}/api`;
const externalApiUrl = null;

const api = axios.create({
    baseURL: localApiUrl
});

export default api;