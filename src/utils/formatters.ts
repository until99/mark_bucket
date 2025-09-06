/**
 * Formata um valor numérico como preço em reais (BRL)
 * @param price - O valor a ser formatado
 * @returns String formatada como preço em reais
 * @example formatPrice(10.5) // "R$ 10,50"
 * @example formatPrice(0) // "R$ 0,00"
 * @example formatPrice(null) // "R$ 0,00"
 */
export const formatPrice = (price: number | null | undefined): string => {
  const value = price || 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Formata uma data no padrão brasileiro (DD/MM/AAAA)
 * @param date - A data a ser formatada (string ISO ou Date)
 * @returns String formatada como data brasileira
 * @example formatDate("2024-03-15T10:30:00Z") // "15/03/2024"
 * @example formatDate(new Date()) // "06/09/2025" (data atual)
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return "--";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Verifica se a data é válida
  if (isNaN(dateObj.getTime())) return "--";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
};

/**
 * Formata uma data e hora no padrão brasileiro (DD/MM/AAAA HH:mm)
 * @param date - A data a ser formatada (string ISO ou Date)
 * @returns String formatada como data e hora brasileira
 * @example formatDateTime("2024-03-15T10:30:00Z") // "15/03/2024 10:30"
 */
export const formatDateTime = (
  date: string | Date | null | undefined
): string => {
  if (!date) return "--";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  // Verifica se a data é válida
  if (isNaN(dateObj.getTime())) return "--";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);
};
