// ============================================================
//  CYSE 411 Q4 Starter Code
//  Employee Directory Application


function loadSession() {
    const raw = sessionStorage.getItem("session");

    try {
        const session = JSON.parse(raw);

        if (
            !session ||
            typeof session.userId !== "string" || session.userId.trim() === "" ||
            typeof session.role !== "string" || session.role.trim() === "" ||
            typeof session.displayName !== "string" || session.displayName.trim() === ""
        ) {
            return null;
        }

        return session;
    } catch (e) {
        return null;
    }
}


// Q4.A – Safe Status Rendering
function renderStatusMessage(containerElement, message) {
    containerElement.textContent = "";

    const p = document.createElement("p");
    p.textContent = message;

    containerElement.appendChild(p);
}


// Q4.B – Search Sanitization
function sanitizeSearchQuery(input) {
    if (typeof input !== "string") return null;

    const sanitized = input.trim();

    if (sanitized.length === 0) return null;
    if (sanitized.length > 40) return null;

    if (!/^[A-Za-z0-9 _-]+$/.test(sanitized)) return null;

    return sanitized;
}

function performSearch(query) {
    const sanitized = sanitizeSearchQuery(query);
    const label = document.getElementById("search-label");

    if (sanitized === null) {
        label.textContent = "Showing results for: Invalid search query";
    } else {
        label.textContent = "Showing results for: " + sanitized;
    }
}


// App start
document.addEventListener("DOMContentLoaded", function () {

    const session = loadSession();
    if (session) {
        document.getElementById("welcome-msg").textContent =
            "Welcome, " + session.displayName;
    }

    const profiles = [
        {
            name: "Alice Johnson",
            department: "Engineering",
            status: "Working from home today"
        },
        {
            name: "Bob Martinez",
            department: "Security",
            status: "<img src=x onerror=\"alert('XSS: session stolen')\">"
        },
        {
            name: "Carol Lee",
            department: "HR",
            status: "Out of office until Friday"
        }
    ];

    const directory = document.getElementById("directory");

    profiles.forEach(function (profile) {
        const card = document.createElement("div");
        card.className = "profile-card";

        const nameEl = document.createElement("h3");
        nameEl.textContent = profile.name;

        const deptEl = document.createElement("p");
        deptEl.textContent = "Department: " + profile.department;

        const statusContainer = document.createElement("div");
        statusContainer.className = "status";

        renderStatusMessage(statusContainer, profile.status);

        card.appendChild(nameEl);
        card.appendChild(deptEl);
        card.appendChild(statusContainer);
        directory.appendChild(card);
    });

    document.getElementById("search-btn").addEventListener("click", function () {
        const query = document.getElementById("search-input").value;
        performSearch(query);
    });

});