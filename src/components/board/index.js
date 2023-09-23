import styles from './index.module.css';

class Board {
    constructor(options) {
        const {
            container,
            columns,
            rows
        } = options;

        this.interval = 1000;

        this.direction = undefined;

        this.active = false;

        this.board = [...new Array(rows).fill()].map(() => {
            return [...new Array(columns).fill()].map(() => {
                return false;
            });
        });
    
        this.snake = {
            row: this._random(rows),
            column: this._random(columns),
        };

        this.food = {
            row: this._random(rows),
            column: this._random(columns),
        };

        let sameRow = this.snake.row === this.food.row;
        let sameColumn = this.snake.column === this.food.column;

        while (sameRow && sameColumn) {
            this.food = {
                row: this._random(rows),
                column: this._random(columns),
            };

            sameRow = this.snake.row === this.food.row;
            sameColumn = this.snake.column === this.food.column;
        }

        this.board[this.snake.row][this.snake.column] = true;
        this.board[this.food.row][this.food.column] = -1;
    
        window.addEventListener('keydown', (event) => {
            event.preventDefault();

            switch (event.code) {
                case 'ArrowLeft':
                    this.direction = 'left';
                    break;
                case 'ArrowRight':
                    this.direction = 'right';
                    break;
                case 'ArrowUp':
                    this.direction = 'up';
                    break;
                case 'ArrowDown':
                    this.direction = 'down';
                    break;
                default:
                    break;
            }
        });

        setInterval(() => {
            this._move();
            //check if game over
        }, this.interval);
    }

    _move(direction) {
        if (!this.active) {
            this.active = true;
            
            return;
        }

        console.log(`Move ${this.direction}`);
    }

    _random(type) {
        return Math.floor(Math.random() * type);
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
                
                if (c === true) {
                    cell.classList.add(styles.snake)
                }

                if (c === -1) {
                    cell.classList.add(styles.food);
                }

                row.appendChild(cell);
            });

            board.appendChild(row);
        });

        container.appendChild(board);
    }
}

export default Board;
