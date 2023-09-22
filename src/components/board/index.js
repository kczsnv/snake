import styles from './index.module.css';

class Board {
    constructor(options) {
        const {
            container,
            columns,
            rows
        } = options;

        this.board = [...new Array(rows).fill()].map(() => {
            return [...new Array(columns).fill()].map(() => {
                return false;
            });
        });
    
        const row = Math.floor(Math.random() * rows);
        const column = Math.floor(Math.random() * columns);
        console.log(row, column);
        this.board[row][column] = true;
    }

    render(container) {
        const board = document.createElement('div');
        board.classList.add(styles.board);

        this.board.map((r, i) => {
            const row = document.createElement('div');
            row.id = `r${i}`;
            row.classList.add(styles.row);

            r.map((c, j) => {
                const cell = document.createElement('div');
                cell.id = `r${i}-c${j}`;
                cell.classList.add(styles.cell);
                
                if (c) {
                    cell.classList.add(styles.filled)
                }

                row.appendChild(cell);
            });

            board.appendChild(row);
        });

        container.appendChild(board);
    }
}

export default Board;
