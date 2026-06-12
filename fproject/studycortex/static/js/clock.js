const clockElement = document.getElementById("clock");
const dateElement = document.getElementById("date");
const timezoneSelect = document.getElementById("timezone");

const timezoneLocales = {
    "Europe/Lisbon": "pt-PT",
    "Europe/London": "en-GB",
    "Europe/Paris": "fr-FR",
    "America/New_York": "en-US",
    "America/Chicago": "en-US",
    "America/Los_Angeles": "en-US",
    "Asia/Tokyo": "ja-JP",
    "Asia/Seoul": "ko-KR",
    "Asia/Shanghai": "zh-CN",
    "Australia/Sydney": "en-AU"
};

function updateClock() {
    const timezone = timezoneSelect.value;
    const locale = timezoneLocales[timezone];

    const now = new Date();

    const time = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(now);

    const date = new Intl.DateTimeFormat(locale, {
        timeZone: timezone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(now);

    clockElement.textContent = time;
    dateElement.textContent = date;
}

timezoneSelect.addEventListener("change", updateClock);

updateClock();
setInterval(updateClock, 1000);