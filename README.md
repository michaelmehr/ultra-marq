# Ultra-Marq Next.js

## TODO

### Issues

### Soon

- [ ] `UserBookmarks` Component
  - [x] Users can read their bookmarks
    - [x] `user_id` column in `bookmarks` table
    - [x] `UserBookmarks`
    - [x] Connect component to database
    - [x] Update database policies
    - [x] Only display bookmarks created by the user
  - [x] Users can insert bookmarks
    - [x] Supabase policy
    - [x] 'Add Bookmark' Dialog
    - [x] Submitted bookmarks are added to the DB
    - [x] Client updates to show new bookmarks
  - [x] Users can delete their bookmarks
    - [x] Supabase policy
    - [x] Generate delete buttons next to every bookmark
  - [ ] Users can edit/update their bookmarks
    - [ ] Supabase policy

### Eventually

- [ ] Hosting (probably vercel)
- [ ] General Styling
  - [ ] Early styling
    - [ ] Remove css from tutorial
    - [ ] Apply tailwind classes
- [ ] Folders
  - [ ] `folders` table
- [ ] Custom Favicon
  - [ ] Create favicon
  - [ ] Apply favicon
- [ ] Keep user authenticated between sessions?
- [ ] Remake `/account/page.jsx`
  - [ ] Replace `AccountForm` with new `Profile` component

### Completed

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
- [x] Reorganize repo, remove unnecesary folder
