// Point d'entrée principal - Frontend public
import './styles/app.css';
import { mountComponents } from './react/mount';

// Monte tous les composants React trouvés dans la page
document.addEventListener('DOMContentLoaded', () => {
    mountComponents();
});
