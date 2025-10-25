interface PhoneData {
  name: string;
  phone: string;
  theme: string;
  comment?: string;
  agreeData: string;
}

export function buildPhoneMessage(phoneData: PhoneData): string {
  return `
🆕 *Новая заяка на обратный звонок!*

*Имя:* ${phoneData.name}
*Телефон:* ${phoneData.phone}
*Тема:* ${phoneData.theme}

${phoneData.comment ? `*Комментарий:* ${phoneData.comment}` : "Без дополнительного комментария"}


${phoneData.agreeData ? "📄 Согласие на обработку данных подписано" : ""}
    `;
}

function escapeMarkdown(text: string): string {
  return text?.replace(/([_*[\]()~`>#+=|{}.!-])/g, "\\$1") ?? "";
}
