const mouseDown = {
  clock0: false,
  weather0: false,
  calender0: false,
  bus0: false,
  tamagotchi0: false,
};

window.addEventListener('mouseup', () => {
  mouseDown.clock0 = false;
  mouseDown.weather0 = false;
  mouseDown.calender0 = false;
  mouseDown.bus0 = false;
  mouseDown.tamagotchi0 = false;
});

const mouseOffset = {
  clock0: { x: 0, y: 0 },
  weather0: { x: 0, y: 0 },
  calender0: { x: 0, y: 0 },
  bus0: { x: 0, y: 0 },
  tamagotchi0: { x: 0, y: 0},
};

var mouseX, mouseY;

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

document.onmouseup = () => {
  mouseDown.clock0 = false;
  mouseDown.weather0 = false;
  mouseDown.calender0 = false;
  mouseDown.bus0 = false;
  mouseDown.tamagotchi0 = false;
}

window.nodeGrab = function (target, event) {
  if (event && (event.target.tagName === 'BUTTON' || event.target.closest('button'))) {
    return;
  }
  const targetId = target === 0 ? 'clock0' : target === 1 ? 'weather0' : target === 2 ? 'calender0' : target === 3 ? 'bus0' : 'tamagotchi0';
  const el = document.getElementById(targetId);
  const rect = el.getBoundingClientRect();

  if (!el.style.left || el.style.left === '') {
    el.style.left = rect.left + 'px';
  }
  if (!el.style.top || el.style.top === '') {
    el.style.top = rect.top + 'px';
  }

  mouseOffset[targetId].x = mouseX - rect.left;
  mouseOffset[targetId].y = mouseY - rect.top;

  if (target === 0) mouseDown.clock0 = true;
  if (target === 1) mouseDown.weather0 = true;
  if (target === 2) mouseDown.calender0 = true;
  if (target === 3) mouseDown.bus0 = true;
  if (target === 4) mouseDown.tamagotchi0 = true;
}

function updateClockPos() {
  if (mouseDown.clock0) {
    const el = document.getElementById('clock0');
    el.style.left = (mouseX - mouseOffset.clock0.x) + 'px';
    el.style.top = (mouseY - mouseOffset.clock0.y) + 'px';
  }
  requestAnimationFrame(updateClockPos);
}

function updateWeatherPos() {
  if (mouseDown.weather0) {
    const el = document.getElementById('weather0');
    el.style.left = (mouseX - mouseOffset.weather0.x) + 'px';
    el.style.top = (mouseY - mouseOffset.weather0.y) + 'px';
  }
  requestAnimationFrame(updateWeatherPos);
}

function updateCalenderPos() {
  if (mouseDown.calender0) {
    const el = document.getElementById('calender0');
    el.style.left = (mouseX - mouseOffset.calender0.x) + 'px';
    el.style.top = (mouseY - mouseOffset.calender0.y) + 'px';
  }
  requestAnimationFrame(updateCalenderPos);
}

function updateBusPos() {
  if (mouseDown.bus0) {
    const el = document.getElementById('bus0');
    el.style.left = (mouseX - mouseOffset.bus0.x) + 'px';
    el.style.top = (mouseY - mouseOffset.bus0.y) + 'px';
  }
  requestAnimationFrame(updateBusPos);
}

function updateTamagotchiPos() {
  if (mouseDown.tamagotchi0) {
    const el = document.getElementById('tamagotchi0');
    el.style.left = (mouseX - mouseOffset.tamagotchi0.x) + 'px';
    el.style.top = (mouseY - mouseOffset.tamagotchi0.y) + 'px';
  }
  requestAnimationFrame(updateTamagotchiPos);
}

requestAnimationFrame(updateCalenderPos);
requestAnimationFrame(updateClockPos);
requestAnimationFrame(updateWeatherPos);
requestAnimationFrame(updateBusPos);
requestAnimationFrame(updateTamagotchiPos);

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock0').innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };
  return i;
}

function startTimer() {
  const now = new Date();

  let target = new Date();
  target.setHours(6, 45, 0, 0);

  if (now > target) {
    target.setDate(target.getDate() + 1);
  }

  let diff = Math.max(0, Math.floor((target - now) / 1000));

  let h = Math.floor(diff / 3600);
  let m = Math.floor((diff % 3600) / 60);
  let s = diff % 60;

  const busEl = document.getElementById('bus0');
  const bus1 = document.getElementById('bus1');

  if (bus1) {
    bus1.innerHTML =
      String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0');
  }

  if (busEl) {
    const maxTime = 1800;
    const ratio = Math.max(0, Math.min(1, diff / maxTime));
    const intensity = 1 - ratio;

    const baseFontSize = 20 + (intensity * 50);
    busEl.style.fontSize = baseFontSize + 'px';

    const greenBlueVal = Math.round(255 * (1 - intensity));
    busEl.style.color = `rgb(255, ${greenBlueVal}, ${greenBlueVal})`;
  }

  setTimeout(startTimer, 1000);
}

const CLIENT_ID = (typeof CONFIG !== 'undefined') ? CONFIG.CLIENT_ID : '';
const API_KEY = (typeof CONFIG !== 'undefined') ? CONFIG.API_KEY : '';
const DISCOVERY_DOC = (typeof CONFIG !== 'undefined') ? CONFIG.DISCOVERY_DOC : '';
const SCOPES = (typeof CONFIG !== 'undefined') ? CONFIG.SCOPES : '';

var tokenClient;
var gapiInited = false;
var gisInited = false;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  checkAndAutoAuth();
}

function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (resp) => {
            if (resp.error !== undefined) {
                document.getElementById('content').innerText = 'Authorization failed.';
                return;
            }
            document.getElementById('signout_button').style.display = 'inline-block';
            await listUpcomingEvents();
        },
    });
    gisInited = true;
    checkAndAutoAuth();
}

function checkAndAutoAuth() {
  if (gapiInited && gisInited) {
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token, () => {
      gapi.client.setToken('');
      document.getElementById('content').innerText = 'User signed out.';
      document.getElementById('signout_button').style.display = 'none';
    });
  }
}

async function listUpcomingEvents() {
  try {
    const calendarListResponse = await gapi.client.calendar.calendarList.list();
    const calendars = calendarListResponse.result.items;

    if (!calendars || calendars.length === 0) {
      document.getElementById('content').innerText = 'No calendars found.';
      return;
    }

    const now = (new Date()).toISOString();
    const eventPromises = calendars.map(cal => {
      const bgColor = cal.backgroundColor || '#3f51b5';

      return gapi.client.calendar.events.list({
        'calendarId': cal.id,
        'timeMin': now,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 15,
        'orderBy': 'startTime',
      }).then(res => (res.result.items || []).map(event => ({
        ...event,
        calendarName: cal.summary,
        backgroundColor: bgColor
      }))).catch(err => {
        console.warn(`Could not fetch events for calendar: ${cal.summary}`, err);
        return [];
      });
    });

    const results = await Promise.all(eventPromises);

    const allEvents = results.flat().sort((a, b) => {
      const dateA = new Date(a.start.dateTime || a.start.date);
      const dateB = new Date(b.start.dateTime || b.start.date);
      return dateA - dateB;
    });

    if (allEvents.length === 0) {
      document.getElementById('content').innerText = 'No upcoming events found.';
      return;
    }

    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    const groupedByDate = {};
    allEvents.forEach(event => {
      const rawDate = event.start.dateTime || event.start.date;
      const dateObj = new Date(rawDate);
      const dateKey = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' }).toUpperCase();

      if (!groupedByDate[dateKey]) {
        groupedByDate[dateKey] = [];
      }
      groupedByDate[dateKey].push({ ...event, dateObj });
    });

    for (const [dateStr, events] of Object.entries(groupedByDate)) {
      const dayGroup = document.createElement('div');
      dayGroup.className = 'calendar-day-group';

      const dateEl = document.createElement('div');
      dateEl.className = 'calendar-date';
      dateEl.innerText = dateStr;
      dayGroup.appendChild(dateEl);

      const eventsListEl = document.createElement('div');
      eventsListEl.className = 'calendar-events-list';

        events.forEach(event => {
        let timeStr = 'All day';
        if (event.start.dateTime && event.end.dateTime) {
          const startT = new Date(event.start.dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
          const endT = new Date(event.end.dateTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
          timeStr = `${startT} – ${endT}`;
        }

      const eventRow = document.createElement('div');
        eventRow.className = 'event-row';

        eventRow.innerHTML = `
            <div class="event-dot" style="background-color: ${event.backgroundColor};"></div>
            <div class="event-time">${timeStr}</div>
            <div class="event-title">${event.summary}</div>
        `;

        eventsListEl.appendChild(eventRow);
      });

      dayGroup.appendChild(eventsListEl);
      contentDiv.appendChild(dayGroup);
    }

  } catch (err) {
    document.getElementById('content').innerText = err.message;
  }
}

(async function () {
  const wCity = document.getElementById('w-city');
  if (!wCity) return;

  const CITY_NAME = 'Graz';

  try {
    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(CITY_NAME)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      document.getElementById('w-city').textContent = "City not found";
      return;
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
    const weatherData = await weatherRes.json();
    const current = weatherData.current;
    const daily = weatherData.daily;
    const weatherMap = {
        0: ["Clear sky", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`],
        1: ["Mainly clear", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41"/><path d="M15.9 12A5 5 0 1 0 7 13.9a4 4 0 0 0-2 7.1h13a4.5 4.5 0 0 0 2.1-8.5 5 5 0 0 0-4.2-.5z"/></svg>`],
        2: ["Partly cloudy", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41"/><path d="M15.9 12A5 5 0 1 0 7 13.9a4 4 0 0 0-2 7.1h13a4.5 4.5 0 0 0 2.1-8.5 5 5 0 0 0-4.2-.5z"/></svg>`],
        3: ["Overcast", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`],
        45: ["Foggy", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 9h14M3 13h18M5 17h14"/></svg>`],
        51: ["Light drizzle", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/><path d="M8 19v1M12 19v1M16 19v1"/></svg>`],
        61: ["Slight rain", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 13a5 5 0 0 0-9-3 8 8 0 1 0-2.8 15.2"/><path d="M8 18v3M12 18v3M16 18v3"/></svg>`],
        63: ["Rain", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 13a5 5 0 0 0-9-3 8 8 0 1 0-2.8 15.2"/><path d="M8 18v4M12 18v4M16 18v4"/></svg>`],
        80: ["Showers", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 13a5 5 0 0 0-9-3 8 8 0 1 0-2.8 15.2"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/></svg>`],
        95: ["Thunderstorm", `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><path d="M13 11l-4 6h3l-1 5 4-6h-3l1-5z"/></svg>`]
    };

    const fallbackIcon = `<svg width="28" height="28" viewBox="-2 -2 28 28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`;

    const [condition, iconSvg] = weatherMap[current.weather_code] || ["Cloudy", fallbackIcon];

    document.getElementById('w-city').textContent = `${name}, ${country}`;
    document.getElementById('w-condition').textContent = condition;
    document.getElementById('w-temp').textContent = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById('w-icon').innerHTML = iconSvg;

    const forecastContainer = document.getElementById('w-forecast');
    forecastContainer.innerHTML = '';

    for (let i = 1; i <= 3; i++) {
      const dateObj = new Date(daily.time[i] + 'T00:00:00');
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      const maxTemp = Math.round(daily.temperature_2m_max[i]);
      const minTemp = Math.round(daily.temperature_2m_min[i]);
      const [_, daySvg] = weatherMap[daily.weather_code[i]] || ["", fallbackIcon];

      const opacity = Math.max(0.3, 1 - (i * 0.25));

      const rowHtml = `
        <div class="forecast-row" style="opacity: ${opacity};">
          <span class="forecast-day">${dayName}</span>
          <span style="display: flex; align-items: center; scale: 0.75;">${daySvg}</span>
          <span style="text-align: right;"><strong class="forecast-temps-max">${maxTemp}°</strong> <span class="forecast-temps-min">${minTemp}°</span></span>
        </div>
      `;
      forecastContainer.insertAdjacentHTML('beforeend', rowHtml);
    }

  } catch (err) {
    document.getElementById('w-city').textContent = "Unavailable";
  }
})();

const element = document.getElementById('clear');
let timeout;

if (element) {
    window.addEventListener('mousemove', () => {
        element.classList.add('show');
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            element.classList.remove('show');
        }, 500);
    });
}

const element0 = document.getElementById('add');
let timeout0;

if (element0) {
    window.addEventListener('mousemove', () => {
        element0.classList.add('show');
        clearTimeout(timeout0);
        timeout0 = setTimeout(() => {
            element0.classList.remove('show');
        }, 500);
    });
}

function clearScreen() {
  const widgets = document.querySelectorAll('.widget');
  widgets.forEach(widget => {
    widget.classList.add('hidden0');
  });
}

function initSelect() {
  const checkboxes = document.querySelectorAll('.widgetCheckbox');

  checkboxes.forEach(checkbox => {
    const widgetId = checkbox.getAttribute('data-widget');

    const isChecked = localStorage.getItem(widgetId) === 'true';
    checkbox.checked = isChecked;

    checkbox.addEventListener('change', () => {
      localStorage.setItem(widgetId, checkbox.checked);
    });
  });
}

function loadWidgets() {
  const widgetIds = ['clock0', 'weather0', 'calender0', 'bus0', 'tamagotchi0'];

  widgetIds.forEach(id => {
    const widgetEl = document.getElementById(id);
    if (!widgetEl) return;

    const isVisible = localStorage.getItem(id) === 'true'

    if (isVisible) {
       widgetEl.classList.remove('hidden0')
    } else {
      widgetEl.classList.add('hidden0')
    }

  })
}

function initAll() {
  startTime();
  startTimer();
  loadWidgets();
}
