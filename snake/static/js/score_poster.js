export function scoreSender (snake_length, walls_broken, bombs_stopped) {
    let cookies = document.cookie;
    let tokenCookie = cookies.split(';')[3];
    let token = tokenCookie.split('=')[1];
    let base_url = window.location.origin;
    let data = {
        'user_id': 2,
        'bombs_stopped': bombs_stopped,
        'snake_length': snake_length,
        'walls_broken': walls_broken
    };
    fetch(`${base_url}/game-scores`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'X-CSRFToken': token
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => console.log(res));
}
