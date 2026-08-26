# globalStateFetching-PatternUI

Global State, Data Fetching Patterns &amp; UI Polish

# Event Management App with Global State (Alpine.js)

A Django CRUD application for scheduling events, enhanced with a reactive frontend using Alpine.js for global state management, skeleton loaders, and polished empty states — without a full JavaScript framework.

📋 Tech Stack
Backend: Django 6+ (Python)

Frontend: Django Templates, Bootstrap 5 (CSS), Alpine.js (reactive UI)

State Management: Alpine.js Alpine.store() (global reactive store)

Data Fetching: Custom API endpoints (JSON) with fetch API

Styling: Bootstrap 5 (originally built with Tailwind CSS, later adapted to Bootstrap for card layout)

🚀 Features
Core CRUD
✅ List all events

✅ Create new event (modal form)

✅ View event details (Django detail page via link)

✅ Delete event (with confirmation)

Added Functionality (Task: Global State, Data Fetching Patterns & UI Polish)
✅ Global state using Alpine.js store (eventStore) – centralizes events, loading, errors, selected event

✅ Refactored features – Event list and Event detail modal now read from shared state (no prop drilling)

✅ Skeleton loaders – Shown during all async operations (refresh, add, delete) with a minimum 500ms delay for perceivable UX

✅ Empty state – Beautifully designed empty UI when no events exist, with a call-to-action to create one

✅ Data hydration – Initial events are injected directly from Django into the store (no extra API call on page load)

✅ CRUD operations – Add and delete events update the store reactively (UI updates instantly)

📁 Project Structure

es/
|├──es/
|├──settings.py #project Level
|├──urls.py #project urls
|└── static/
│ └── css/
│ └── js/
│ └── js/eventStore.js # Alpine.js global store
|
├── manage.py
├── esapp/ # main app
│ ├── models.py # Event model
│ ├── views.py # Django views + API endpoints
│ ├── urls.py # URL routing
│ ├── templates/
│ │ └── events/
│ │ └── events_list.html # Main template with Alpine.js integration
│
│
│
├── requirements.txt
└── README.md
⚙️ Setup Instructions
Clone the repository

bash
git clone <repo-url>
cd events_project
Create a virtual environment

bash
python -m venv venv
source venv/bin/activate # or venv\Scripts\activate on Windows
Install dependencies

bash
pip install -r requirements.txt
Run migrations

bash
python manage.py migrate
Create a superuser (optional)

bash
python manage.py createsuperuser
Run the development server

bash
python manage.py runserver
Visit http://127.0.0.1:8000/ to see the events listing.

#🔌 API Endpoints
The frontend uses these JSON endpoints for CRUD operations:

Method Endpoint Description
GET /events/ List all events
POST events/create/ Create a new event
DELETE /events/delete/<id>/ Delete an event by ID
Note: CSRF protection is handled via a token read from the meta tag or cookie.

🎨 UI Polish Features
Skeleton loaders – Animated placeholder cards with Bootstrap's placeholder classes.

Empty state – A friendly illustration, headline, subtext, and “Create New Event” button when no events exist.

Reactive updates – Adding or deleting an event instantly updates the list without a page reload.

🧠 Global State Management with Alpine.js
The eventStore is defined in static/js/eventStore.js and is used across the entire page:

javascript
<code>
Alpine.store('eventStore', {
events: [],
loading: false,
error: null,
selectedEventId: null,

// Actions: hydrate, fetchEvents, addEvent, deleteEvent, selectEvent
})
<code>
Hydration pattern:
Initial events are injected from Django via window.initialEvents and passed to the store's hydrate() method in x-init. This avoids an extra API request on page load.

# 🔄 Data Fetching Patterns

On refresh – fetchEvents() is called, setting loading = true, showing skeletons, and fetching fresh data from the API.

On add – addEvent() posts the new event, updates the local events array optimistically, and re‑renders the list.

On delete – deleteEvent() removes the event after a DELETE request.

Minimum delay – All async actions include a 500ms minimum delay to ensure skeleton loaders are visible (improves perceived performance).

# 📸 Screenshots

Add screenshots of the event list, skeleton loaders, empty state, and modal here if needed.

🤝 Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

📄 License
MIT

# Built with ❤️ using Django and Alpine.js by MM
