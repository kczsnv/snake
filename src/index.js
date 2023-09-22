import Board from './components/board';
import './index.css';

const container = document.querySelector('#game');

const board = new Board({
    rows: 10,
    columns: 10,
});

board.render(container);
