# Ultra-Marq Next.js

## TODO

### Issues

- [ ] `/account`, 'Expected server HTML to contain a matching `<tr>` in `<table>`.'
  - [ ] change `user-bookmarks.jsx` into a client component, mimicking `account-form.jsx` and `avatar.jsx`
    - [ ] useEffect, async

### Soon

- [ ] Allow users to create and view their own bookmarks
  - [x] `user_id` column in `bookmarks` table
  - [ ] `CreateBookmark` component
  - [ ] Connect component to database
  - [ ] Only display bookmarks created by the user
  - [ ] Update database policies

### Eventually

- [ ] Hosting (probably vercel)
- [ ] Replace 'Send Magic Link' authentication
  - [ ] Username/Password
- [ ] General Styling
  - [ ] Early styling
    - [ ] Replace css from tutorial
    - [ ] Apply tailwind classes
- [ ] Folders
  - [ ] `folders` table
- [ ] Custom Favicon
  - [ ] Create favicon in InkScape
  - [ ] Apply favicon

### Completed

- [x] Hook up Supabase
- [x] Clean up unnecessary files from template
- [x] Handling multiple users / login system
- [x] Bookmarks table
  - [x] Create table in supabase
  - [x] Display data
  - [x] Format/style to appear as a table
  - [x] Make URLs clickable
