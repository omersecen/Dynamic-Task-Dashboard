# Task Dashboard

A small study task dashboard for Web Programming Assignment 4. It uses plain JavaScript, HTML and CSS.

Open `index.html` in a browser. No installation or build step is needed.

Click **Load Tasks** to get the three sample tasks after a 1.5 second delay. **Toggle** changes completion, **Delete** removes a task, and the form adds a new one. **Edit** opens a field to change the title; use **Save** or **Cancel** to finish. Loading again restores the sample list. Nothing is saved after refreshing the page.

## Files

- `index.html`: page structure and script loading.
- `styles.css`: layout, buttons, mobile view and completed task styling.
- `taskManager.js`: `Task` and `TaskManager` classes.
- `api.js`: the simulated server request.
- `main.js`: loading, JSON conversion, DOM rendering and button events.

## Implementation notes

The main points to handle were keeping old arrays unchanged and making sure loaded tasks still had their class methods. The manager uses spread, `map` and `filter`. Since JSON parsing gives back plain objects, the parsed data is converted into `Task` instances before rendering.

The load handler uses `try/catch/finally` so an error shows a message and the controls become usable again. The sample API always succeeds; the error handling is there for a rejected request.

## Checking the page

In the browser, check loading, toggling, deleting, editing, adding a task and loading again. The initial task list should be empty, and only Practice DOM should be completed after loading. Blank titles are rejected. Editing a title keeps its id and completion state.
