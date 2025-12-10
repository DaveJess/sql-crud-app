export async function sendBookEmail(
  to: string,
  pdfBuffer: Buffer,
  title: string
) {
  // integrate nodemailer here
  console.log(`Email sent to ${to} with PDF book: ${title}`);
};
