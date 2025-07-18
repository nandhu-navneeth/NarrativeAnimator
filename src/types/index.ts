export interface Scene {
  id: string;
  text: string;
  imageUrl?: string;
  narrationUrl?: string;
  isImageLoading: boolean;
  isNarrationLoading: boolean;
}
