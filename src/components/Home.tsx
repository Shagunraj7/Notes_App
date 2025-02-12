import Sidebar from './Sidebar'
import NotesList from './NotesList'
import NotesViewer from './NotesViewer'

function Home() {
  return (
    <div className='flex'>
        <Sidebar />
        <NotesList />
        <NotesViewer />
    </div>
  )
}

export default Home
