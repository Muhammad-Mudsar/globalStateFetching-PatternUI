// UI Global state manager
document.addEventListener('alpine:init', () => {
    Alpine.store('eventStore', {
        events: [],
        loading: false,
        error: null,
        selectedEventId: null,

        get selectedEvent() {
            return this.events.find(e => e.id === this.selectedEventId) || null;
        },

        // Hydrate with Django-injected data
        hydrate(initialEvents) {
            this.events = initialEvents;
        },

        // Fetch (if you need refresh later)
        async fetchEvents() {
            this.loading = true;
            this.error = null;
            const start = Date.now();
            try {
                const res = await fetch('/events/');
                if (!res.ok) throw new Error('Failed to fetch');
                this.events = await res.json();
            } catch (err) {
                this.error = err.message;
            } finally {
                // Ensure loading shows for at least 500ms
                const elapsed = Date.now() - start;
                const minDelay = 500; // milliseconds
                if (elapsed < minDelay) {
                    await new Promise(resolve => setTimeout(resolve, minDelay - elapsed));
                }
                this.loading = false;
            }
        },

        // Add new event (POST)
        async addEvent(eventData) {
            this.loading = true;
            try {
                const res = await fetch('/events/create/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken()  // we'll define this below
                    },
                    body: JSON.stringify(eventData)
                });
                const newEvent = await res.json();
                this.events = [...this.events, newEvent];
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        // Delete event
        async deleteEvent(id) {
            if (!confirm('Delete! Are you sure ?')) return;
            this.loading = true;
            try {
                await fetch(`/events/delete/${id}/`, {
                    method: 'DELETE',
                    headers: { 'X-CSRFToken': getCSRFToken() }
                });
                this.events = this.events.filter(e => e.id !== id);
            } catch (err) {
                this.error = err.message;
            } finally {
                this.loading = false;
            }
        },

        selectEvent(id) {
            this.selectedEventId = id;
        }
    });
});

// CSRF helper
function getCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value ||
        document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
}


// document.addEventListener('alpine:init', () => {
//     Alpine.store('eventStore', {
//         // State
//         events: [],        // Will be populated by Django initial data
//         loading: false,
//         error: null,
//         selectedEventId: null,

//         // Computed
//         get selectedEvent() {
//             return this.events.find(e => e.id === this.selectedEventId) || null;
//         },

//         // --- ACTIONS ---

//         // 1. Hydrate (called on page load with Django data)
//         hydrate(initialEvents) {
//             this.events = initialEvents;
//         },

//         // 2. Fetch all (if you want to refresh later)
//         async fetchEvents() {
//             this.loading = true;
//             this.error = null;
//             try {
//                 const res = await fetch('/events/');
//                 if (!res.ok) throw new Error('Failed to fetch');
//                 this.events = await res.json();
//             } catch (err) {
//                 this.error = err.message;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         // 3. Add Event (POST)
//         async addEvent(eventData) {
//             this.loading = true;
//             try {
//                 const res = await fetch('/api/events/create/', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCSRFToken() },
//                     body: JSON.stringify(eventData)
//                 });
//                 const newEvent = await res.json();
//                 this.events = [...this.events, newEvent]; // UI updates instantly
//             } catch (err) {
//                 this.error = err.message;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         // 4. Delete Event
//         async deleteEvent(id) {
//             if (!confirm('Are you sure?')) return;
//             this.loading = true;
//             try {
//                 await fetch(`/api/events/delete/${id}/`, {
//                     method: 'DELETE',
//                     headers: { 'Content-Type': 'application/json', 'X-CSRFToken': getCSRFToken() },
//                     body: JSON.stringify(eventData)
//                 });
//                 this.events = this.events.filter(e => e.id !== id);
//             } catch (err) {
//                 this.error = err.message;
//             } finally {
//                 this.loading = false;
//             }
//         },

//         selectEvent(id) {
//             this.selectedEventId = id;
//         }
//     });
// });