interface PhoneData {
  name: string;
  phone: string;
  theme: string;
  comment?: string;
  agreeData: string;
}

export function buildPhoneEmail(phoneData: PhoneData): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1d4ed8">🆕 Новая заявка на обратный звонок</h2>

      <p style="margin:4px 0"><b>Имя:</b> ${phoneData.name}</p>
      <p style="margin:4px 0"><b>Телефон:</b> ${phoneData.phone}</p>
      <p style="margin:4px 0"><b>Тема:</b> ${phoneData.theme}</p>

      ${phoneData.comment ? `<p style="margin:4px 0"><b>Комментарий:</b> ${phoneData.comment}</p>` : "<p style='color:#6b7280'>Без дополнительного комментария</p>"}

      ${phoneData.agreeData ? `<p style="margin-top:16px;color:#6b7280;font-size:13px">📄 Согласие на обработку данных подписано</p>` : ""}
    </div>
  `;
}
