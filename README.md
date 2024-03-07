# clerk-todolist

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### How to use the app

The app has a single page. By default, notes are ordered by priority.

No tasks: You will see a message.

Task: Each task has a circle on the left indicating whether the task is done or not - title - subtitle - small collapsable icon (not working right now but I think it's a usefull feature) - priority (could be high - medium - low) - a button to edit the task - description. Within the task there may or may not be subtasks. 

Subtask: Each subtask has the same circle on the left - title - subtitle - collapsable - delete button - description.

Edit task button: Clicking the button should open a modal with the current data. Here you can update the data or delete the task.

Delete button: When you click the button, you delete the subtask.

Add new subtask: Clicking the button should open a modal with inputs to create a new subtask for the current task.

Add new task: Clicking the button should open a modal with inputs to create a new task.

Search bar: When you type a note name you can filter your note.

Filter icon: you can filter your tasks or order your tasks.
