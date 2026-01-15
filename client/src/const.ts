export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Retorna a rota interna para o painel de administração.
 * Removida a dependência de OAuth externo que causava erros de URL inválida.
 */
export const getLoginUrl = () => {
  return "/admin";
};