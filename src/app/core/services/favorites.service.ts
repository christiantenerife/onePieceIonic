import { Injectable } from '@angular/core';

export type FavoriteType = 'personaje' | 'fruta' | 'saga';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private key = 'onepiece_favorites';

  private getFavorites(): string[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  private saveFavorites(favorites: string[]) {
    localStorage.setItem(this.key, JSON.stringify(favorites));
  }

  private makeId(type: FavoriteType, id: number | string): string {
    return `${type}-${id}`;
  }

  getAllFavorites(): string[] {
  return this.getFavorites();
}

  isFavorite(type: FavoriteType, id: number | string): boolean {
    return this.getFavorites().includes(this.makeId(type, id));
  }

  toggleFavorite(type: FavoriteType, id: number | string): boolean {
    const favoriteId = this.makeId(type, id);
    const favorites = this.getFavorites();

    if (favorites.includes(favoriteId)) {
      this.saveFavorites(favorites.filter(item => item !== favoriteId));
      return false;
    }

    favorites.push(favoriteId);
    this.saveFavorites(favorites);
    return true;
  }
}