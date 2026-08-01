export const WHATSAPP_NUMBER = "917838429078";

export function getWhatsAppUrl(productName: string, modelNumber?: string, price?: number): string {
  const message = `Hello FLAMPIA,

I am interested in this product.

Product:
${productName}

Model:
${modelNumber || "FLP-MAIN-01"}

Price:
₹${price ? price.toLocaleString("en-IN") : "Price on Request"}

Please share more details.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppEnquiry(productName: string, modelNumber?: string, price?: number): void {
  const url = getWhatsAppUrl(productName, modelNumber, price);
  window.open(url, "_blank", "noopener,noreferrer");
}
