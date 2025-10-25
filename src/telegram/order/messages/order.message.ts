interface Client {
  name: string;
  phone: string;
  city: string;
  agreeInstallation: boolean;
  agreeData: boolean;
}

interface Product {
  title: string;
  finalPrice: number;
  count: number;
}

interface OrderData {
  client: Client;
  products: Product[];
  total: string;
}

export function buildOrderMessage(orderData: OrderData): string {
  const { client, products, total } = orderData;

  const productList = products
    .map(
      (p, i) =>
        `${i + 1}. ${p.title} — ${p.count} шт × ${p.finalPrice.toLocaleString()} ₽`
    )
    .join("\n");

  return `
🆕 *Новый заказ!*

*Клиент:* ${client.name}
*Телефон:* ${client.phone}
*Город:* ${client.city}

*Товары:*
${productList}

*Итого:* ${total} ₽

${client.agreeInstallation ? "✅ *КЛИЕНТУ ТРЕБУЕТСЯ МОНТАЖ*" : ""}

${client.agreeData ? "📄 Согласие на обработку данных подписано" : ""}
    `;
}

function escapeMarkdown(text: string): string {
  return text?.replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1") ?? "";
}
