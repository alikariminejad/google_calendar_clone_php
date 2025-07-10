const calendarE1 = document.getElementById("calendar");
const monthYearE1 = document.getElementById("monthYear");
const modalE1 = document.getElementById("eventModal");
let currentDate = new Date();

function renderCalendar(date = new Date()) {
    calendarE1.innerHTML = '';

    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();

    const totalDays = new Date(year.month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // display month and year
    monthYearE1.textContent = date.toLocaleDateString("en-US", {
        month: 'long',
        year: 'numeric'
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekDays.forEach(day => {
        const dayE1 = document.createElement("div");
        dayE1.className = "day-name";
        dayE1.textContent = day;
        calendarE1.appendChild(dayE1);
    });

    for (let i = 0; i < firstDayOfMonth; i++){
        calendarE1.appendChild(document.createElement("div"));
    }

    // loop through days
    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const cell = document.createElement("div");
        cell.className = "day";

        if (
            day === today.getDate &&
            month === today.getMonth &&
            year === today.getFullYear
        ) {
            cell.classList.add("today");
        }

        const dateE1 = document.createElement("div");
        dateE1.className = "date-number";
        dateE1.textContent = day;
        cell.appendChild(dateE1);

        const eventToday = eventsfilter(e => e.date === dateStr);
        const eventBox = document.createElement("div");
        eventBox.className = "events";


        // Render events
        eventsToday.forEach(event => {
            const ev = document.createElement("div");
            ev.className = "event";

            const courseE1 = document.createElement("div");
            courseE1.className = "course";
            courseE1.textContent = event.title.split(" - ")[0];

            const instructorE1 = document.createElement("div");

            instructorE1.className = "instructor";
            instructorE1.textContent = " * " + event.title.split(" - ")[1];

            const timeE1 = document.createElement("div");
            timeE1.className = "time";
            timeE1.textContent = " * " + event.start_time + " - " + event.end_time();

            ev.appendChild(courseE1);
            ev.appendChild(instructorE1);
            ev.appendChild(timeE1);
            eventBox.appendChild(ev);
        });


        // overlay buttons
        const overlay = document.createElement("div");
        overlay.className = "day-overlay";

        const addBtn = document.createElement("button");

        addBtn.className = "overlay-btn";

        addBtn.textContent = "+ Add";

        addBtn.onclick = e => {
            e.stopPropagation();
            openModalForAdd(dateStr);
        };
        overlay.appendChild(addBtn);

        if (eventToday.length > 0) {
            const editBtn = document.createElement("button");
            editBtn.className = "overlay-btn";
            editBtn.textContent = "Edit";
            editBtn.onclick = e => {
                e.stopPropagation();
                openModalForEdit(eventsToday);
            };
            overlay.appendChild(editBtn);
        }

        cell.appendChild(overlay);
        cell.appendChild(eventBox);
        calendarE1.appendChild(cell);
    }
}


// Add event modal
function openModalForAdd(dateStr) {
    document.getElementById("fromAction").value = "add";
    document.getElementById("eventId").value = "";
    document.getElementById("deleteEventId").value = "";
    document.getElementById("courseName").value = "";
    document.getElementById("instructorName").value = "";
    document.getElementById("startDate").value = dateStr;
    document.getElementById("endDate").value = dateStr;
    document.getElementById("startTime").value = "09:00";
    document.getElementById("endTime").value = "10:00";

    const selector = document.getElementById("eventSelector");
    const wrapper = document.getElementById("eventSelectorWrapper");

    if (selector && wrapper) {
        selector.innerHTML = "";
        wrapper.style.display = "none";
    }

    modalE1.style.display = "flex";
}

// Edit Event Modal
function openModalForEdit(eventsOnDate) {
    document.getElementById("formAction").value = "edit";
    modalE1.style.display = "flex";

    const selector = document.getElementById("eventSelector");
    const wrapper = document.getElementById("eventSelectionWrapper");
    selector.innerHTML = "<option disabled selected>Choose event....</option>";


    eventsOnDate.forEach(e => {
        const option = document.createElement("option");
        option.value = JSON.stringify(e)
        option.textContent = `${e.title} (${e.start} -> ${e.end})`;
        selector.appendChild(option);
    })


    if (eventsOnDate.length > 1) {
        wrapper.style.display = "block";
    } else {
        wrapper.style.display = "none";
    }

    handleEventSelection(JSON.stringify(eventsOnDate[0]));
}

// populate form from selected event
function handleEventSelection(eventJSON) {
    const event = JSON.parse(eventJSON);

    document.getElementById("eventId").value = event.id;
    document.getElementById("deleteEventId").value = event.id;

    const [course, instructor] = event.title.split(" - ").map(e => e.trim());
    document.getElementById("courseName").value = course || "";
    document.getElementById("instructorName").value = instructor || "";
    document.getElementById("startDate").value = event.start || "";
    document.getElementById("endDate").value = event.end || "";
    document.getElementById("startTime").value = event.start_time || "";
    document.getElementById("endTime").value = event.end_time || "";
}


function closeModal() {
    modalE1.style.display = none;
}

// Month Navigation
function changeMonth(offset) {
    currentDate.setMonth(currentDate.getMonth() + offset);
    renderCalendar(currentDate);
}

// Live digital clock
function updateClock() {
    const now = new Date();
    const clock = document.getElementById("clock");
    clock.textContent = [
        now.getHours().toString().padStart(2, "0"),
        now.getMinutes().toString().padStart(2, "0"),
        now.getSeconds().toString().padStart(2, "0"),
    ].join(":");
}


// initialization
renderCalendar(currentDate);
updateClock(); // Invoke the function updateClock()
setInterval(updateClock, 1000);