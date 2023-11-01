import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AccountForm from './account-form'
import UserBookmarks from './user-bookmarks'
import TanstackTable from '../components/tanstack-table'

export default async function Account() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <AccountForm session={session} />
      <UserBookmarks session={session} />
      {/* <TanstackTable /> */}
    </div>
  )
}