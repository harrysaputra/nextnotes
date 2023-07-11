import Link from 'next/link';
import CreateNote from './[id]/CreateNote';

async function getNotes() {
  const res = await fetch(
    'http://127.0.0.1:8090/api/collections/notes/records?page=1&perPage=10'
  );

  console.log('res', res);
  const data = await res.json();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div className="w-full min-h-screen flex">
      <div className="bg-slate-50 p-8 w-1/4">
        <h1 className="text-2xl font-bold text-slate-600 mb-8">
          NextNotes
        </h1>
        <CreateNote />
      </div>
      <div className="p-8 w-3/4">
        <div className="grid grid-cols-3 gap-6 mt-16">
          {notes?.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  const dateCreated = new Date(created);
  const formattedDate = Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(dateCreated);

  return (
    <Link href={`notes/${id}`}>
      <div className="bg-yellow-50 p-4 shadow">
        <h3 className="text-xl text-slate-600 font-bold">{title}</h3>
        <p>{content}</p>
        <span className="text-sm text-slate-400 mt-12 block">
          {formattedDate}
        </span>
      </div>
    </Link>
  );
}
