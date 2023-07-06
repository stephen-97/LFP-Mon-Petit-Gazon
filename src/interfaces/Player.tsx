// Interface object joueur des joueurs dans l'API championship_player_pool
interface PlayerConfig {
    id: string,
    firstName: string,
    lastName: string,
    position: number,
    ultraPosition: number,
    quotation: number,
    clubId: string,
    stats: object,
}

// Méthode pour récupérer le nom complet du joueur
const getPlayerFullName = (player: PlayerConfig): string => {
    return player.firstName + ' ' + player.lastName
}

// Joueur par défaut à utiliser à l'initialisation du state "player" du store redux
const defaultPlayer: PlayerConfig = {
    id: "",
    firstName: "",
    lastName: "",
    position: 0,
    ultraPosition: 0,
    quotation: 0,
    clubId: "",
    stats: {},
}

// Méthode pour récupérer le poste du joueur en fonction de son "ultraPosition"
const getPlayerPost = (player: PlayerConfig): string => {
    switch (player.ultraPosition){
        case 10: return 'Gardien - G';
        case 20: return 'Defenseur - D';
        case 21: return 'Lateral - L';
        case 30: return 'Milieu défensif - MD';
        case 31: return 'Milieu offensif - MO';
        case 40: return 'Attaquant - A';
        default : return ''
    }
}


export {  PlayerConfig, getPlayerFullName, getPlayerPost, defaultPlayer}