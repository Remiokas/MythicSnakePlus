export function scoreSender (snake_length, walls_broken, bombs_stopped) {
    var xhr = new XMLHttpRequest();
    var base_url = window.location.origin;
    xhr.open("POST", `${base_url}/game-scores/`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        'user_id': 2,
        'bombs_stopped': bombs_stopped,
        'snake_length': snake_length,
        'walls_broken': walls_broken
    }));
}