import { Injectable } from '@angular/core';

export type FavoriteType = 'personaje' | 'fruta' | 'saga';

@Injectable({
  providedIn: 'root' //el servicio está disponible en toda la aplicación sin tener que importarlo manualmente en cada módulo.
})
export class FavoritesService {
  private key = 'onepiece_favorites'; //"Key" que se usará para almacenar los favoritos en el localStorage, es importante usar un nombre único para evitar conflictos con otros datos almacenados.

  private getFavorites(): string[] { 
    return JSON.parse(localStorage.getItem(this.key) || '[]'); //localStorage.getItem(this.key) busca los favoritos en el navegador. Si no encuentra nada, devuelve null, por eso usamos || '[]' para asegurarnos de que siempre tengamos un array, aunque esté vacío. Luego, JSON.parse convierte la cadena almacenada en el localStorage de nuevo a un array
  }

  private saveFavorites(favorites: string[]) { //Esta función guarda los favoritos.
    localStorage.setItem(this.key, JSON.stringify(favorites));
  }

  private makeId(type: FavoriteType, id: number | string): string { //Esta función crea el identificador del favorito.
    return `${type}-${id}`;
  }

  getAllFavorites(): string[] { //devuelve un array con los favoritos
  return this.getFavorites();
}

  isFavorite(type: FavoriteType, id: number | string): boolean { //Esta función comprueba si un elemento ya está en favoritos
    return this.getFavorites().includes(this.makeId(type, id));
  }

  toggleFavorite(type: FavoriteType, id: number | string): boolean { //Importante! 
    const favoriteId = this.makeId(type, id);
    const favorites = this.getFavorites();

    if (favorites.includes(favoriteId)) { //Comprueba si ese favorito ya existe.Si ya existe, lo elimina.
      this.saveFavorites(favorites.filter(item => item !== favoriteId));
      return false;
    }

    favorites.push(favoriteId);
    this.saveFavorites(favorites);
    return true;
  }
}