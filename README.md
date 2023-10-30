# Ultra-Marq Next.js

## TODO

### Issues

- [ ] Reorganize repo, remove unnecesary folder

### Soon

- [ ] Allow users to create and view their own bookmarks
  - [ ] `user_id` column in `bookmarks` table
  - [ ] `CreateBookmark` component
  - [ ] Connect component to database
  - [ ] Only display bookmarks created by the user
  - [ ] Update database policies
- [ ] Replace magic link auth with email/password auth

### Eventually

- [ ] Hosting (probably vercel)
- [ ] General Styling
  - [ ] Early styling
    - [ ] Replace css from tutorial
    - [ ] Apply tailwind classes
- [ ] Folders
  - [ ] `folders` table
- [ ] Custom Favicon
  - [ ] Create favicon in InkScape
  - [ ] Apply favicon
- [ ] Keep user authenticated between sessions?
- [ ] Remake `/account/page.jsx`
  - [ ] Replace `AccountForm` with new `Profile` component

### Completed

<<<<<<< HEAD
- [x] Hook up Supabase
- [x] Clean up unnecessary files from template
- [x] Handling multiple users / login system
- [x] Bookmarks table
  - [x] Create table in supabase
  - [x] Display data
  - [x] Format/style to appear as a table
  - [x] Make URLs clickable
- [x] Issue: `/account`, 'Expected server HTML to contain a matching `<tr>` in `<table>`.'
  - [x] change `user-bookmarks.jsx` into a client component, mimicking `account-form.jsx` and `avatar.jsx`
    - [x] useEffect, async
    - [x] could've solved it much quicker if i just checked the actual browser console
=======
- [x] ~~Hook up Supabase~~
- [x] ~~Clean up unnecessary files from template~~
>>>>>>> f76dc89957a077c5c4876fa1de21cfbbae96f3e1
