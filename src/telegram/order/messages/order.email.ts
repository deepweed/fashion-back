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

export function buildOrderEmail(orderData: OrderData): string {
  const { client, products, total } = orderData;

  const productRows = products
    .map(
      (p, i) => `
        <tr>
          <td style="padding:6px 8px">${i + 1}. ${p.title}</td>
          <td style="padding:6px 8px;text-align:center">${p.count} шт</td>
          <td style="padding:6px 8px;text-align:right">${p.finalPrice.toLocaleString()} ₽</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1d4ed8">🆕 Новый заказ</h2>

      <h3 style="margin-bottom:4px">Клиент</h3>
      <p style="margin:2px 0"><b>Имя:</b> ${client.name}</p>
      <p style="margin:2px 0"><b>Телефон:</b> ${client.phone}</p>
      <p style="margin:2px 0"><b>Город:</b> ${client.city}</p>

      <h3 style="margin-top:20px;margin-bottom:8px">Товары</h3>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb">
        <thead>
          <tr style="background:#f3f4f6">
            <th style="padding:6px 8px;text-align:left">Наименование</th>
            <th style="padding:6px 8px">Кол-во</th>
            <th style="padding:6px 8px;text-align:right">Цена</th>
          </tr>
        </thead>
        <tbody>${productRows}</tbody>
        <tfoot>
          <tr style="background:#f3f4f6;font-weight:bold">
            <td colspan="2" style="padding:6px 8px">Итого</td>
            <td style="padding:6px 8px;text-align:right">${total} ₽</td>
          </tr>
        </tfoot>
      </table>

      ${client.agreeInstallation ? `<p style="margin-top:16px;color:#16a34a;font-weight:bold">✅ Клиенту требуется монтаж</p>` : ""}
      ${client.agreeData ? `<p style="color:#6b7280;font-size:13px">📄 Согласие на обработку данных подписано</p>` : ""}
    </div>
  `;
}
