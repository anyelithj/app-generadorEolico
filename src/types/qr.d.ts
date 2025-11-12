// // types/qr.d.ts
// /**
//  * types/qr.d.ts
//  *
//  * Tipos para la generación y control de códigos QR usados para acceso móvil.
//  */

// export interface QRPayload {
//   url: string; // URL que será codificada en el QR
//   createdAt: number; // timestamp de creación
// }

// export interface QRState {
//   url: string; // URL asociada
//   dataUrl: string; // DataURL (PNG/SVG) del QR generado (si está disponible)
//   isGenerated: boolean; // si hay QR generado en estado
//   error?: string | null; // error de generación
// }

// // final
/**
 * types/qr.d.ts
 *
 * Tipos para la generación y control de códigos QR usados para acceso móvil.
 */

export interface QRPayload {
  url: string;          // URL que será codificada en el QR
  createdAt: string;    // fecha ISO del momento en que se creó el QR
}

export interface QRState {
  url: string;          // URL asociada
  dataUrl: string;      // DataURL (PNG/SVG) del QR generado (si está disponible)
  isGenerated: boolean; // indica si el QR fue generado
  error?: string | null;// error de generación (opcional)
}
