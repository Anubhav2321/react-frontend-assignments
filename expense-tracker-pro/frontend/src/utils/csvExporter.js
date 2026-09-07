/**
 * Utility to export transactions to a CSV file.
 * Uses native Blob features for download without external libraries.
 */
export const exportToCSV = (transactions) => {
  if (!transactions || !transactions.length) return;

  const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
  
  const csvRows = [];
  csvRows.push(headers.join(','));

  for (const row of transactions) {
    const date = new Date(row.date).toISOString().split('T')[0];
    const type = row.type;
    const category = `"${row.category.replace(/"/g, '""')}"`;
    const amount = row.amount;
    const description = `"${row.description.replace(/"/g, '""')}"`;

    csvRows.push([date, type, category, amount, description].join(','));
  }

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
