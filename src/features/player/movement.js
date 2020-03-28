import store from '../../config/store'
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants'

export default function handleMovement(player) {

    function getNewPosition(direction) {
        const oldPos = store.getState().player.position
        switch (direction) {
            case 'Q':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
            case 'D':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
            case 'Z':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE]
            case 'S':
                return [oldPos[0], oldPos[1] + SPRITE_SIZE]
        }
    }

    function observeBoudaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH-SPRITE_SIZE) && (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT-SPRITE_SIZE) ? newPos : oldPos
    }

    function dispatchMove(direction) {
        store.dispatch({
            type: 'MOVE_PLAYER',
            payload: {
                position: observeBoudaries(store.getState().player.position, getNewPosition(direction))
            }

        })
    }

    function handleKeyDown(e) {
        e.preventDefault()
        switch (e.keyCode) {
            case 90:
                dispatchMove('Z')
                console.log('Z')
                break;
            case 81:
                dispatchMove('Q')
                console.log('Q')
                break;
            case 68:
                dispatchMove('D')
                console.log('D')
                break;
            case 83:
                dispatchMove('S')
                console.log('S')
                break;
            default:
                console.log(e.keyCode)
                break;
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return player
}