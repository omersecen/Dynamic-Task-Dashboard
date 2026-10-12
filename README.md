# Task Dashboard

A task dashboard for Web Programming Assignment 4, built with HTML, CSS and plain JavaScript.

Open `index.html` in a browser to run it.

**Load Tasks** loads three sample tasks after 1.5 seconds. You can add, edit, toggle and delete tasks. Loading again restores the samples. Refreshing the page clears your changes.

## Files

- `index.html`: page structure.
- `styles.css`: page styling.
- `taskManager.js`: task classes and state updates.
- `api.js`: delayed sample data.
- `main.js`: loading tasks, rendering and events.

## Notes

The main difficulty was updating tasks without changing the old array. Spread, `map` and `filter` create new arrays for this.

JSON parsing returns plain objects, so they are converted into `Task` instances before rendering. The load handler also catches errors and shows a message.
