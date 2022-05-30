document.addEventListener('DOMContentLoaded', async function () {
    const weekday = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()]
    const data = await (await fetch("./data.json")).json()
    const max = data.reduce(function (prev, cur) {
        return prev > cur.amount ? prev : cur.amount;
    }, 0)
    document.getElementsByClassName(weekday)[0].classList.add("actual")
    for (const day of data) {
        document.getElementsByClassName(day.day)[0].getElementsByClassName("total")[0].innerHTML = "$" + day.amount;
        document.getElementsByClassName(day.day)[0].style.height = (day.amount / max * 100) + "%";
    }
}, false);
