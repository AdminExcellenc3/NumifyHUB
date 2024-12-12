export function calculateInvoiceTotals(items: Array<{ quantity: number; unitPrice: number }>) {
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const taxRate = 0.21; // 21% BTW
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

export function formatInvoiceNumber(number: string) {
  if (!number) return '';
  
  // Ensure the number follows the format INV-YYYY-XXXX
  const parts = number.split('-');
  if (parts.length !== 3) return number;

  const year = parts[1];
  const sequence = parts[2].padStart(4, '0');
  
  return `INV-${year}-${sequence}`;
}

export function generateDueDate(issueDate: Date, paymentTermDays = 30) {
  const dueDate = new Date(issueDate);
  dueDate.setDate(dueDate.getDate() + paymentTermDays);
  return dueDate;
}